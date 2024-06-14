import type { Signal, QRL } from '@builder.io/qwik';
import type { ComponentInfo } from '@/interfaces/components.interface';

export type CanvaContextState = {
  currentComponent: Signal<ComponentInfo | undefined>;
  componentData: ComponentData;
  components: ComponentsStore;
  setCurrentComponentId: QRL<(componentId: string) => void>;
  moveElement: QRL<(id: string) => void>;
  resizeElement: QRL<(id: string) => void>;
  rotateElement: QRL<(id: string) => void>;
  removeElement: QRL<(id: string) => void>;
  removeBackground: QRL<() => void>;
};

// TODO: Add rotate, width, height, left, top, 
export type ComponentData = {
  color: string;
  image: string;
};

export type ComponentsStore = {
  [key: string]: ComponentInfo;
};
