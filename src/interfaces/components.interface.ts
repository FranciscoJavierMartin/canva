import type { QRL } from '@builder.io/qwik';

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
  rotateElement: QRL<() => void>;
  moveElement: QRL<() => void>;
  resizeElement: QRL<() => void>;
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

export type ComponentInfo = MainFrameInfo | ShapeInfo;
