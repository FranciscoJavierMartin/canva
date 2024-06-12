import type { Signal, QRL } from '@builder.io/qwik';

export type CanvaContextState = {
  currentComponent: Signal<ComponentInfo | undefined>;
  components: Signal<ComponentInfo[]>;
  setCurrentComponent: QRL<(component: ComponentInfo) => void>;
  moveElement: QRL<() => void>;
  resizeElement: QRL<() => void>;
  rotateElement: QRL<() => void>;
  removeElement: QRL<() => void>;
};
