import type { Signal, QRL } from '@builder.io/qwik';
import type { ComponentInfo } from '@/interfaces/types/components';

export type CanvaContextState = {
  currentComponent: Signal<ComponentInfo | undefined>;
  componentData: ComponentData;
  components: ComponentInfo[];
  setCurrentComponent: QRL<(component: ComponentInfo) => void>;
  moveElement: QRL<() => void>;
  resizeElement: QRL<() => void>;
  rotateElement: QRL<() => void>;
  removeElement: QRL<(id: number) => void>;
  removeBackground: QRL<() => void>;
};

export type ComponentData = {
  color: string;
  image: string;
};
