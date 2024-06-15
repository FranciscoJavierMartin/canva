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

async function toSvg<T extends HTMLElement>(
  node: T,
  options: Options = {},
): Promise<string> {
  const clonedNode = (await cloneNode(node, options, true)) as HTMLElement;
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
