import type { Signal, QRL } from '@builder.io/qwik';
import type { ComponentInfo } from '@/interfaces/components.interface';

export type CanvaContextState = {
  currentComponent: Signal<ComponentInfo | undefined>;
  componentData: ComponentData;
  textComponentData: TextComponentData;
  components: ComponentsStore;
  setCurrentComponentId: QRL<(componentId: string) => void>;
  moveElement: QRL<(id: string) => void>;
  resizeElement: QRL<(id: string) => void>;
  rotateElement: QRL<(id: string) => void>;
  removeElement: QRL<(id: string) => void>;
  removeBackground: QRL<() => void>;
};

export type ComponentData = {
  color: string;
  image: string;
  rotation: number;
  width: number;
  height: number;
  left: number;
  top: number;
  opacity: number;
  zIndex: number;
  radius: number;
};

export type TextComponentData = {
  fontSize: number;
  padding: number;
  fontWeight: number;
  text: string;
};

export type ComponentsStore = {
  [key: string]: ComponentInfo;
};
