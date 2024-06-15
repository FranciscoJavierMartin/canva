import { createId } from '@paralleldrive/cuid2';

type Options = Partial<{
  /**
   * Width in pixels to be applied to node before rendering.
   */
  width: number;
  /**
   * Height in pixels to be applied to node before rendering.
   */
  height: number;
  /**
   * A string value for the background color, any valid CSS color value.
   */
  backgroundColor: string;
  /**
   * Width in pixels to be applied to canvas on export.
   */
  canvasWidth: number;
  /**
   * Height in pixels to be applied to canvas on export.
   */
  canvasHeight: number;
  /**
   * An object whose properties to be copied to node's style before rendering.
   */
  style: Partial<CSSStyleDeclaration>;
  /**
   * A function taking DOM node as argument. Should return `true` if passed
   * node should be included in the output. Excluding node means excluding
   * it's children as well.
   */
  filter: (domNode: HTMLElement) => boolean;
  /**
   * A number between `0` and `1` indicating image quality (e.g. 0.92 => 92%)
   * of the JPEG image.
   */
  quality: number;
  /**
   * Set to `true` to append the current time as a query string to URL
   * requests to enable cache busting.
   */
  cacheBust: boolean;
  /**
   * Set false to use all URL as cache key.
   * Default: false | undefined - which strips away the query parameters
   */
  includeQueryParams: boolean;
  /**
   * A data URL for a placeholder image that will be used when fetching
   * an image fails. Defaults to an empty string and will render empty
   * areas for failed images.
   */
  imagePlaceholder: string;
  /**
   * The pixel ratio of captured image. Defalut is the actual pixel ratio of
   * the device. Set 1 to use as initial-scale 1 for the image
   */
  pixelRatio: number;
  /**
   * Option to skip the fonts download and embed.
   */
  skipFonts: boolean;
  /**
   * The preferred font format. If specified all other font formats are ignored.
   */
  preferredFontFormat:
    | 'woff'
    | 'woff2'
    | 'truetype'
    | 'opentype'
    | 'embedded-opentype'
    | 'svg'
    | string;
  /**
   * A CSS string to specify for font embeds. If specified only this CSS will
   * be present in the resulting image. Use with `getFontEmbedCSS()` to
   * create embed CSS for use across multiple calls to library functions.
   */
  fontEmbedCSS: string;
  /**
   * A boolean to turn off auto scaling for truly massive images..
   */
  skipAutoScale: boolean;
  /**
   * A string indicating the image format. The default type is image/png; that type is also used if the given type isn't supported.
   */
  type: string;

  /**
   *
   *the second parameter of  window.fetch (Promise<Response> fetch(input[, init]))
   *
   */
  fetchRequestInit: RequestInit;
}>;
type Pseudo = ':before' | ':after';
type Metadata = {
  url: string;
  cssText: string;
};

const URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
const URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
const FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
// @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas#maximum_canvas_size
const canvasDimensionLimit: number = 16384;
const cssFetchCache: { [href: string]: Metadata } = {};
const cache: { [url: string]: string } = {};

const WOFF = 'application/font-woff';
const JPEG = 'image/jpeg';
const mimes: { [key: string]: string } = {
  woff: WOFF,
  woff2: WOFF,
  ttf: 'application/font-truetype',
  eot: 'application/vnd.ms-fontobject',
  png: 'image/png',
  jpg: JPEG,
  jpeg: JPEG,
  gif: 'image/gif',
  tiff: 'image/tiff',
  svg: 'image/svg+xml',
  webp: 'image/webp',
};

function resolveUrl(url: string, baseUrl: string | null): string {
  // url is absolute already
  if (url.match(/^[a-z]+:\/\//i)) {
    return url;
  }

  // url is absolute already, without protocol
  if (url.match(/^\/\//)) {
    return window.location.protocol + url;
  }

  // dataURI, mailto:, tel:, etc.
  if (url.match(/^[a-z]+:/i)) {
    return url;
  }

  const doc = document.implementation.createHTMLDocument();
  const base = doc.createElement('base');
  const a = doc.createElement('a');

  doc.head.appendChild(base);
  doc.body.appendChild(a);

  if (baseUrl) {
    base.href = baseUrl;
  }

  a.href = url;

  return a.href;
}

function getPx(node: HTMLElement, styleProperty: string): number {
  const win = node.ownerDocument.defaultView || window;
  const value = win.getComputedStyle(node).getPropertyValue(styleProperty);
  return value ? parseFloat(value.replace('px', '')) : 0;
}

function getNodeHeight(node: HTMLElement): number {
  const topBorder = getPx(node, 'border-top-width');
  const bottomBorder = getPx(node, 'border-bottom-width');
  return node.clientHeight + topBorder + bottomBorder;
}

function getNodeWidth(node: HTMLElement): number {
  const leftBorder = getPx(node, 'border-left-width');
  const rightBorder = getPx(node, 'border-right-width');
  return node.clientWidth + leftBorder + rightBorder;
}

function getImageSize(
  targetNode: HTMLElement,
  options: Options = {},
): { height: number; width: number } {
  const width = options.width || getNodeWidth(targetNode);
  const height = options.height || getNodeHeight(targetNode);

  return { height, width };
}

function toArray<T>(arrayLike: any): T[] {
  const arr: T[] = [];

  for (let i = 0, l = arrayLike.length; i < l; i++) {
    arr.push(arrayLike[i]);
  }

  return arr;
}

function isSlotElement(node: HTMLElement): node is HTMLSlotElement {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return node.tagName != null && node.tagName.toUpperCase() === 'SLOT';
}

function isInstanceOfElement<
  T extends typeof Element | typeof HTMLElement | typeof SVGImageElement,
>(
  node: Element | Element | SVGImageElement,
  instance: T,
): node is T['prototype'] {
  let res: boolean;
  if (node instanceof instance) {
    res = true;
  } else {
    const nodePrototype = Object.getPrototypeOf(node);

    if (nodePrototype) {
      res =
        nodePrototype.constructor.name === instance.name ||
        isInstanceOfElement(nodePrototype, instance);
    } else {
      res = false;
    }
  }
  return res;
}

async function cloneChildren<T extends HTMLElement>(
  nativeNode: T,
  clonedNode: T,
  options: Options,
): Promise<T> {
  let children: T[] = [];

  if (isSlotElement(nativeNode) && nativeNode.assignedNodes) {
    children = toArray<T>(nativeNode.assignedNodes());
  } else {
    children = toArray<T>((nativeNode.shadowRoot ?? nativeNode).childNodes);
  }

  if (children.length) {
    await children.reduce(
      (deferred, child) =>
        deferred
          .then(() => cloneNode(child, options))
          .then((clonedChild: HTMLElement | null) => {
            if (clonedChild) {
              clonedNode.appendChild(clonedChild);
            }
          }),
      Promise.resolve(),
    );
  }

  return clonedNode;
}

function cloneCSSStyle<T extends HTMLElement>(nativeNode: T, clonedNode: T) {
  const targetStyle = clonedNode.style;

  if (targetStyle) {
    const sourceStyle = window.getComputedStyle(nativeNode);

    if (sourceStyle.cssText) {
      targetStyle.cssText = sourceStyle.cssText;
      targetStyle.transformOrigin = sourceStyle.transformOrigin;
    } else {
      toArray<string>(sourceStyle).forEach((name) => {
        let value = sourceStyle.getPropertyValue(name);

        if (name === 'font-size' && value.endsWith('px')) {
          const reducedFont =
            Math.floor(parseFloat(value.substring(0, value.length - 2))) - 0.1;
          value = `${reducedFont}px`;
        }

        if (name === 'd' && clonedNode.getAttribute('d')) {
          value = `path(${clonedNode.getAttribute('d')})`;
        }

        targetStyle.setProperty(
          name,
          value,
          sourceStyle.getPropertyPriority(name),
        );
      });
    }
  }
}

function formatCSSText(style: CSSStyleDeclaration) {
  const content = style.getPropertyValue('content');
  return `${style.cssText} content: '${content.replace(/'|"/g, '')}';`;
}

function formatCSSProperties(style: CSSStyleDeclaration) {
  return toArray<string>(style)
    .map((name) => {
      const value = style.getPropertyValue(name);
      const priority = style.getPropertyPriority(name);

      return `${name}: ${value}${priority ? ' !important' : ''};`;
    })
    .join(' ');
}

function getPseudoElementStyle(
  className: string,
  pseudo: Pseudo,
  style: CSSStyleDeclaration,
) {
  const selector = `.${className}:${pseudo}`;
  const cssText = style.cssText
    ? formatCSSText(style)
    : formatCSSProperties(style);

  return document.createTextNode(`${selector}{${cssText}}`);
}

function clonePseudoElement<T extends HTMLElement>(
  nativeNode: T,
  clonedNode: T,
  pseudo: Pseudo,
): void {
  const style = window.getComputedStyle(nativeNode, pseudo);
  const content = style.getPropertyValue('content');

  if (!(content || content === 'none')) {
    const className = createId();

    try {
      clonedNode.className = `${clonedNode.className} ${className}`;
      const styleElement = document.createElement('style');
      styleElement.appendChild(getPseudoElementStyle(className, pseudo, style));
      clonedNode.append(styleElement);
    } catch (error) {
      console.log(error);
    }
  }
}

function clonePseudoElements<T extends HTMLElement>(
  nativeNode: T,
  clonedNode: T,
): void {
  clonePseudoElement(nativeNode, clonedNode, ':before');
  clonePseudoElement(nativeNode, clonedNode, ':after');
}

async function decorate<T extends HTMLElement>(
  nativeNode: T,
  clonedNode: T,
): Promise<T> {
  if (isInstanceOfElement(clonedNode, Element)) {
    cloneCSSStyle(nativeNode, clonedNode);
    clonePseudoElements(nativeNode, clonedNode);
  }

  return clonedNode;
}

async function ensureSVGSymbols<T extends HTMLElement>(
  cloned: T,
  options: Options,
): Promise<T> {
  let clonedNode: T = cloned;
  const uses: NodeListOf<SVGUseElement> = clonedNode.querySelectorAll('use');

  if (uses.length) {
    const processedDefs: { [key: string]: HTMLElement } = {};

    uses.forEach(async (value) => {
      const id = value.getAttribute('xlink:href');
      if (id) {
        const exist = clonedNode.querySelector(id);
        const definition: HTMLElement | null = document.querySelector(id);
        if (!exist && definition && !processedDefs[id]) {
          processedDefs[id] = (await cloneNode(definition, options, true))!;
        }
      }
    });

    const nodes = Object.values(processedDefs);

    if (nodes.length) {
      const ns = 'http://www.w3.org/1999/xhtml';
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('xmlns', ns);
      svg.style.position = 'absolute';
      svg.style.width = '0';
      svg.style.height = '0';
      svg.style.overflow = 'hidden';
      svg.style.display = 'none';

      const defs = document.createElementNS(ns, 'defs');
      svg.appendChild(defs);

      for (let i = 0; i < nodes.length; i++) {
        defs.appendChild(nodes[i]);
      }

      clonedNode.appendChild(svg);
    }
  } else {
    clonedNode = cloned;
  }

  return clonedNode;
}

async function cloneNode<T extends HTMLElement>(
  node: T,
  options: Options,
  isRoot?: boolean,
): Promise<T | null> {
  return !isRoot && options.filter && !options.filter(node)
    ? null
    : Promise.resolve(node)
        .then((clonedNode) => clonedNode.cloneNode(false) as T)
        .then((clonedNode) => cloneChildren(node, clonedNode, options))
        .then((clonedNode) => decorate(node, clonedNode))
        .then((clonedNode) => ensureSVGSymbols(clonedNode, options))
        .catch(() => null);
}

async function fetchCSS(url: string) {
  let cache = cssFetchCache[url];
  if (cache != null) {
    return cache;
  }

  const res = await fetch(url);
  const cssText = await res.text();
  cache = { url, cssText };

  cssFetchCache[url] = cache;

  return cache;
}

async function fetchAsDataURL<T>(
  url: string,
  init: RequestInit | undefined,
  process: (data: { result: string; res: Response }) => T,
): Promise<T> {
  const res = await fetch(url, init);
  if (res.status === 404) {
    throw new Error(`Resource "${res.url}" not found`);
  }
  const blob = await res.blob();
  return new Promise<T>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onloadend = () => {
      try {
        resolve(process({ res, result: reader.result as string }));
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsDataURL(blob);
  });
}

async function embedFonts(data: Metadata, options: Options): Promise<string> {
  let cssText = data.cssText;
  const regexUrl = /url\(["']?([^"')]+)["']?\)/g;
  const fontLocs = cssText.match(/url\([^)]+\)/g) || [];
  const loadFonts = fontLocs.map(async (loc: string) => {
    let url = loc.replace(regexUrl, '$1');
    if (!url.startsWith('https://')) {
      url = new URL(url, data.url).href;
    }

    return fetchAsDataURL<[string, string]>(
      url,
      options.fetchRequestInit,
      ({ result }) => {
        cssText = cssText.replace(loc, `url(${result})`);
        return [loc, result];
      },
    );
  });

  return Promise.all(loadFonts).then(() => cssText);
}

function parseCSS(source: string) {
  if (source == null) {
    return [];
  }

  const result: string[] = [];
  const commentsRegex = /(\/\*[\s\S]*?\*\/)/gi;
  // strip out comments
  let cssText = source.replace(commentsRegex, '');

  // eslint-disable-next-line prefer-regex-literals
  const keyframesRegex = new RegExp(
    '((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})',
    'gi',
  );

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const matches = keyframesRegex.exec(cssText);
    if (matches === null) {
      break;
    }
    result.push(matches[0]);
  }
  cssText = cssText.replace(keyframesRegex, '');

  const importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
  // to match css & media queries together
  const combinedCSSRegex =
    '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]' +
    '*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})';
  // unified regex
  const unifiedRegex = new RegExp(combinedCSSRegex, 'gi');

  // eslint-disable-next-line no-constant-condition
  while (true) {
    let matches = importRegex.exec(cssText);
    if (matches === null) {
      matches = unifiedRegex.exec(cssText);
      if (matches === null) {
        break;
      } else {
        importRegex.lastIndex = unifiedRegex.lastIndex;
      }
    } else {
      unifiedRegex.lastIndex = importRegex.lastIndex;
    }
    result.push(matches[0]);
  }

  return result;
}

async function getCSSRules(
  styleSheets: CSSStyleSheet[],
  options: Options,
): Promise<CSSStyleRule[]> {
  const ret: CSSStyleRule[] = [];
  const deferreds: Promise<number | void>[] = [];

  // First loop inlines imports
  styleSheets.forEach((sheet) => {
    if ('cssRules' in sheet) {
      try {
        toArray<CSSRule>(sheet.cssRules || []).forEach((item, index) => {
          if (item.type === CSSRule.IMPORT_RULE) {
            let importIndex = index + 1;
            const url = (item as CSSImportRule).href;
            const deferred = fetchCSS(url)
              .then((metadata) => embedFonts(metadata, options))
              .then((cssText) =>
                parseCSS(cssText).forEach((rule) => {
                  try {
                    sheet.insertRule(
                      rule,
                      rule.startsWith('@import')
                        ? (importIndex += 1)
                        : sheet.cssRules.length,
                    );
                  } catch (error) {
                    console.error('Error inserting rule from remote css', {
                      rule,
                      error,
                    });
                  }
                }),
              )
              .catch((e) => {
                console.error('Error loading remote css', e.toString());
              });

            deferreds.push(deferred);
          }
        });
      } catch (e) {
        const inline =
          styleSheets.find((a) => a.href == null) || document.styleSheets[0];
        if (sheet.href != null) {
          deferreds.push(
            fetchCSS(sheet.href)
              .then((metadata) => embedFonts(metadata, options))
              .then((cssText) =>
                parseCSS(cssText).forEach((rule) => {
                  inline.insertRule(rule, sheet.cssRules.length);
                }),
              )
              .catch((err: unknown) => {
                console.error('Error loading remote stylesheet', err);
              }),
          );
        }
        console.error('Error inlining remote css file', e);
      }
    }
  });

  return Promise.all(deferreds).then(() => {
    // Second loop parses rules
    styleSheets.forEach((sheet) => {
      if ('cssRules' in sheet) {
        try {
          toArray<CSSStyleRule>(sheet.cssRules || []).forEach((item) => {
            ret.push(item);
          });
        } catch (e) {
          console.error(`Error while reading CSS rules from ${sheet.href}`, e);
        }
      }
    });

    return ret;
  });
}

function shouldEmbed(url: string): boolean {
  return url.search(URL_REGEX) !== -1;
}

function getWebFontRules(cssRules: CSSStyleRule[]): CSSStyleRule[] {
  return cssRules
    .filter((rule) => rule.type === CSSRule.FONT_FACE_RULE)
    .filter((rule) => shouldEmbed(rule.style.getPropertyValue('src')));
}

async function parseWebFontRules<T extends HTMLElement>(
  node: T,
  options: Options,
) {
  if (node.ownerDocument === null) {
    throw new Error('Provided element is not within a Document');
  }

  const styleSheets = toArray<CSSStyleSheet>(node.ownerDocument.styleSheets);
  const cssRules = await getCSSRules(styleSheets, options);

  return getWebFontRules(cssRules);
}

function isDataUrl(url: string) {
  return url.search(/^(data:)/) !== -1;
}

function toRegex(url: string): RegExp {
  // eslint-disable-next-line no-useless-escape
  const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
  return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, 'g');
}

function getExtension(url: string): string {
  const match = /\.([^./]*?)$/g.exec(url);
  return match ? match[1] : '';
}

function getMimeType(url: string): string {
  const extension = getExtension(url).toLowerCase();
  return mimes[extension] || '';
}

function parseURLs(cssText: string): string[] {
  const urls: string[] = [];

  cssText.replace(URL_REGEX, (raw, quotation, url) => {
    urls.push(url);
    return raw;
  });

  return urls.filter((url) => !isDataUrl(url));
}

function getCacheKey(
  url: string,
  contentType: string | undefined,
  includeQueryParams: boolean | undefined,
) {
  let key = url.replace(/\?.*/, '');

  if (includeQueryParams) {
    key = url;
  }

  // font resource
  if (/ttf|otf|eot|woff2?/i.test(key)) {
    key = key.replace(/.*\//, '');
  }

  return contentType ? `[${contentType}]${key}` : key;
}

function makeDataUrl(content: string, mimeType: string) {
  return `data:${mimeType};base64,${content}`;
}

function getContentFromDataUrl(dataURL: string) {
  return dataURL.split(/,/)[1];
}

async function resourceToDataURL(
  resourceUrl: string,
  contentType: string | undefined,
  options: Options,
) {
  const cacheKey = getCacheKey(
    resourceUrl,
    contentType,
    options.includeQueryParams,
  );

  if (cache[cacheKey] != null) {
    return cache[cacheKey];
  }

  // ref: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
  if (options.cacheBust) {
    // eslint-disable-next-line no-param-reassign
    resourceUrl += (/\?/.test(resourceUrl) ? '&' : '?') + new Date().getTime();
  }

  let dataURL: string;
  try {
    const content = await fetchAsDataURL(
      resourceUrl,
      options.fetchRequestInit,
      ({ res, result }) => {
        if (!contentType) {
          // eslint-disable-next-line no-param-reassign
          contentType = res.headers.get('Content-Type') || '';
        }
        return getContentFromDataUrl(result);
      },
    );
    dataURL = makeDataUrl(content, contentType!);
  } catch (error) {
    dataURL = options.imagePlaceholder || '';

    let msg = `Failed to fetch resource: ${resourceUrl}`;
    if (error) {
      msg = typeof error === 'string' ? error : (error as any).message;
    }

    if (msg) {
      console.warn(msg);
    }
  }

  cache[cacheKey] = dataURL;
  return dataURL;
}

async function embed(
  cssText: string,
  resourceURL: string,
  baseURL: string | null,
  options: Options,
  getContentFromUrl?: (url: string) => Promise<string>,
): Promise<string> {
  try {
    const resolvedURL = baseURL
      ? resolveUrl(resourceURL, baseURL)
      : resourceURL;
    const contentType = getMimeType(resourceURL);
    let dataURL: string;
    if (getContentFromUrl) {
      const content = await getContentFromUrl(resolvedURL);
      dataURL = makeDataUrl(content, contentType);
    } else {
      dataURL = await resourceToDataURL(resolvedURL, contentType, options);
    }
    return cssText.replace(toRegex(resourceURL), `$1${dataURL}$3`);
  } catch (error) {
    // pass
  }

  return cssText;
}

function filterPreferredFontFormat(
  str: string,
  { preferredFontFormat }: Options,
): string {
  return !preferredFontFormat
    ? str
    : str.replace(FONT_SRC_REGEX, (match: string) => {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const [src, , format] = URL_WITH_FORMAT_REGEX.exec(match) || [];
          if (!format) {
            return '';
          }

          if (format === preferredFontFormat) {
            return `src: ${src};`;
          }
        }
      });
}

async function embedResources(
  cssText: string,
  baseUrl: string | null,
  options: Options,
): Promise<string> {
  if (!shouldEmbed(cssText)) {
    return cssText;
  }

  const filteredCSSText = filterPreferredFontFormat(cssText, options);
  const urls = parseURLs(filteredCSSText);
  return urls.reduce(
    (deferred, url) =>
      deferred.then((css) => embed(css, url, baseUrl, options)),
    Promise.resolve(filteredCSSText),
  );
}

async function getWebFontCSS<T extends HTMLElement>(
  node: T,
  options: Options,
): Promise<string> {
  const rules = await parseWebFontRules(node, options);
  const cssTexts = await Promise.all(
    rules.map((rule) => {
      const baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
      return embedResources(rule.cssText, baseUrl, options);
    }),
  );

  return cssTexts.join('\n');
}

async function embedWebFonts<T extends HTMLElement>(
  clonedNode: T,
  options: Options,
): Promise<string> {
  const cssText =
    options.fontEmbedCSS != null
      ? options.fontEmbedCSS
      : options.skipFonts
        ? null
        : await getWebFontCSS(clonedNode, options);

  if (cssText) {
    const styleNode = document.createElement('style');
    const styleContent = document.createTextNode(cssText);

    styleNode.appendChild(styleContent);

    if (clonedNode.firstChild) {
      clonedNode.insertBefore(styleNode, clonedNode.firstChild);
    } else {
      clonedNode.appendChild(styleNode);
    }
  }
}

async function embedProp(
  propName: string,
  node: HTMLElement,
  options: Options,
) {
  const propValue = node.style?.getPropertyValue(propName);
  if (propValue) {
    const cssString = await embedResources(propValue, null, options);
    node.style.setProperty(
      propName,
      cssString,
      node.style.getPropertyPriority(propName),
    );
    return true;
  }
  return false;
}

async function embedBackground<T extends HTMLElement>(
  clonedNode: T,
  options: Options,
) {
  if (!(await embedProp('background', clonedNode, options))) {
    await embedProp('background-image', clonedNode, options);
  }
  if (!(await embedProp('mask', clonedNode, options))) {
    await embedProp('mask-image', clonedNode, options);
  }
}

async function embedChildren<T extends HTMLElement>(
  clonedNode: T,
  options: Options,
) {
  const children = toArray<HTMLElement>(clonedNode.childNodes);
  const deferreds = children.map((child) => embedImages(child, options));
  await Promise.all(deferreds).then(() => clonedNode);
}

async function embedImageNode<T extends HTMLElement | SVGImageElement>(
  clonedNode: T,
  options: Options,
) {
  const isImageElement = isInstanceOfElement(clonedNode, HTMLImageElement);

  if (
    !(isImageElement && !isDataUrl(clonedNode.src)) &&
    !(
      isInstanceOfElement(clonedNode, SVGImageElement) &&
      !isDataUrl(clonedNode.href.baseVal)
    )
  ) {
    return;
  }

  const url = isImageElement ? clonedNode.src : clonedNode.href.baseVal;

  const dataURL = await resourceToDataURL(url, getMimeType(url), options);
  await new Promise((resolve, reject) => {
    clonedNode.onload = resolve;
    clonedNode.onerror = reject;

    const image = clonedNode as HTMLImageElement;
    if (image.decode) {
      image.decode = resolve as any;
    }

    if (image.loading === 'lazy') {
      image.loading = 'eager';
    }

    if (isImageElement) {
      clonedNode.srcset = '';
      clonedNode.src = dataURL;
    } else {
      clonedNode.href.baseVal = dataURL;
    }
  });
}

async function embedImages<T extends HTMLElement>(
  clonedNode: T,
  options: Options,
) {
  if (isInstanceOfElement(clonedNode, Element)) {
    await embedBackground(clonedNode, options);
    await embedImageNode(clonedNode, options);
    await embedChildren(clonedNode, options);
  }
}

function applyStyle<T extends HTMLElement>(node: T, options: Options): T {
  const { style } = node;

  if (options.backgroundColor) {
    style.backgroundColor = options.backgroundColor;
  }

  if (options.width) {
    style.width = `${options.width}px`;
  }

  if (options.height) {
    style.height = `${options.height}px`;
  }

  const manual = options.style;

  if (manual != null) {
    Object.keys(manual).forEach((key: any) => {
      style[key] = manual[key] as string;
    });
  }

  return node;
}

async function svgToDataURL(svg: SVGElement): Promise<string> {
  return Promise.resolve()
    .then(() => new XMLSerializer().serializeToString(svg))
    .then(encodeURIComponent)
    .then((html) => `data:image/svg+xml;charset=utf-8,${html}`);
}

async function nodeToDataURL(
  node: HTMLElement,
  width: number,
  height: number,
): Promise<string> {
  const xmlns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(xmlns, 'svg');
  const foreignObject = document.createElementNS(xmlns, 'foreignObject');

  svg.setAttribute('width', `${width}`);
  svg.setAttribute('height', `${height}`);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  foreignObject.setAttribute('width', '100%');
  foreignObject.setAttribute('height', '100%');
  foreignObject.setAttribute('x', '0');
  foreignObject.setAttribute('y', '0');
  foreignObject.setAttribute('externalResourcesRequired', 'true');

  svg.appendChild(foreignObject);
  foreignObject.appendChild(node);
  return svgToDataURL(svg);
}

async function toSvg<T extends HTMLElement>(
  node: T,
  options: Options = {},
): Promise<string> {
  const clonedNode = (await cloneNode<T>(node, options, true)) as HTMLElement;
  await embedWebFonts(clonedNode, options);
  await embedImages(clonedNode, options);
  applyStyle(clonedNode, options);
  const datauri = await nodeToDataURL(
    clonedNode,
    options.width || 0,
    options.height || 0,
  );
  return datauri;
}

async function toCanvas<T extends HTMLElement>(
  node: T,
  options: Options = {},
): Promise<HTMLCanvasElement> {
  const { width, height } = getImageSize(node, options);
  const svg = await toSvg(node, { ...options, width, height });

  return undefined as any;
}

export async function toPng<T extends HTMLElement>(
  node: T,
  options: Options = {},
): Promise<string> {
  const canvas = await toCanvas(node, options);
  return canvas.toDataURL();
}
