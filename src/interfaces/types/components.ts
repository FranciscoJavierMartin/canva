// TODO: Extract common properties
export type MainFrameInfo = {
  name: 'main_frame';
  type: 'rect';
  id: number;
  height: number;
  width: number;
  zIndex: number;
  color: string;
  image: string;
};

export type ShapeRectInfo = {
  name: 'shape';
  type: 'rect';
  id: number;
  height: number;
  width: number;
  zIndex: number;
  color: string;
  image: string;

  left: number;
  top: number;
  rotate: number;
  opacity: number;
};

export type ComponentInfo = MainFrameInfo | ShapeRectInfo;
