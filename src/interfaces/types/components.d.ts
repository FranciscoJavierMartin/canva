// TODO: Extract common properties
type BaseComponent = {
  id: number;
  height: number;
  width: number;
  zIndex: number;
  color: string;
};

export type MainFrameInfo = BaseComponent & {
  name: 'main_frame';
  type: 'rect';
  image: string;
};

export type ShapeRectInfo = BaseComponent & {
  name: 'shape';
  type: 'rect';
  image: string;
  left: number;
  top: number;
  rotate: number;
  opacity: number;
};

export type ComponentInfo = MainFrameInfo | ShapeRectInfo;
