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

async function cloneNode<T extends HTMLElement>(
  node: T,
  options: Options,
  isRoot?: boolean,
): Promise<T | null> {
  return !isRoot && options.filter && !options.filter(node)
    ? null
    : Promise.resolve(node)
        .then((clonedNode) => clonedNode.cloneNode(false) as T)
        .then(
          (clonedNode) =>
            cloneChildren(node, clonedNode, options) as Promise<T>,
        );
  // .then((clonedNode) => decorate(node, clonedNode) as Promise<T>)
  // .then(
  //   (clonedNode) => ensureSVGSymbols(clonedNode, options) as Promise<T>,
  // )
  // .catch(() => null);
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
