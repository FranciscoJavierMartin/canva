import type { Signal, QRL } from '@builder.io/qwik';
import type { ComponentInfo } from '@/interfaces/components.interface';

export type CanvaContextState = {
  currentComponent: Signal<ComponentInfo | undefined>;
  componentData: ComponentData;
  components: ComponentsStore;
  setCurrentComponentId: QRL<(componentId: string) => void>;
  moveElement: QRL<() => void>;
  resizeElement: QRL<() => void>;
  rotateElement: QRL<() => void>;
  removeElement: QRL<(id: string) => void>;
  removeBackground: QRL<() => void>;
};

export type ComponentData = {
  color: string;
  image: string;
};

export type ComponentsStore = {
  [key: string]: ComponentInfo;
};