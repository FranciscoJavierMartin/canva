interface BaseComponent {
  id: string;
  height: number;
  width: number;
  zIndex: number;
  color: string;
}

export interface MainFrameInfo extends BaseComponent {
  name: 'main_frame';
  type: 'rect';
  image: string;
}

interface ShapeCommonInfo extends BaseComponent {
  name: 'shape';
  image: string;
  left: number;
  top: number;
  rotation: number;
  opacity: number;
}

export interface ShapeRectInfo extends ShapeCommonInfo {
  type: 'rect';
}

export interface ShapeCircleInfo extends ShapeCommonInfo {
  type: 'circle';
}

export interface ShapeTriangleInfo extends ShapeCommonInfo {
  type: 'triangle';
}

export type ShapeInfo = ShapeRectInfo | ShapeCircleInfo | ShapeTriangleInfo;

export interface TextInfo extends Omit<BaseComponent, 'height' | 'width'> {
  name: 'text';
  type: 'rect';
  left: number;
  top: number;
  rotation: number;
  opacity: number;
  padding: number;
  fontSize: number;
  text: string;
  fontWeight: number;
}

export interface ImageInfo extends BaseComponent {
  type: 'image';
  name: 'image';
  opacity: number;
  left: number;
  top: number;
  rotation: number;
  image: string;
}

export type ComponentInfo = MainFrameInfo | ShapeInfo | TextInfo | ImageInfo;
