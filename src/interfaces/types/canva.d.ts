import type { Signal, QRL } from '@builder.io/qwik';

export type CanvaContextState = {
  currentComponent: Signal<ComponentInfo | undefined>;
  componentData: ComponentData;
  components: Signal<ComponentInfo[]>;
  setCurrentComponent: QRL<(component: ComponentInfo) => void>;
  moveElement: QRL<() => void>;
  resizeElement: QRL<() => void>;
  rotateElement: QRL<() => void>;
  removeElement: QRL<() => void>;
};

export type ComponentData = {
  color: string;
  image: string;
};
