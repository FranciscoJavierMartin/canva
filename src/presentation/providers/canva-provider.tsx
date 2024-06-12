import {
  $,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useStore,
  type Signal,
} from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';
import type { ComponentInfo } from '@/interfaces/types/components';
import type {
  CanvaContextState,
  ComponentData,
} from '@/interfaces/types/canva';

export default component$(() => {
  // eslint-disable-next-line prefer-const
  let currentComponent: Signal<ComponentInfo | undefined>;

  const componentData = useStore<ComponentData>({
    color: '',
  });

  const setCurrentComponent = $((component: ComponentInfo) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (currentComponent?.value) {
      currentComponent.value = component;
    }
  });

  // eslint-disable-next-line qwik/use-method-usage
  currentComponent = useSignal<ComponentInfo | undefined>({
    name: 'main_frame',
    type: 'rect',
    id: Math.floor(Math.random() * 10_000 + 1),
    height: 500,
    width: 650,
    zIndex: 1,
    color: '#fff',
    image: '',
    setCurrentComponent: setCurrentComponent,
  });

  const components = useSignal<ComponentInfo[]>([currentComponent.value!]);

  const moveElement = $(() => {
    console.log('Move element');
  });

  const resizeElement = $(() => {
    console.log('Resize element');
  });

  const rotateElement = $(() => {
    console.log('Rotate element');
  });

  const removeElement = $(() => {
    console.log('Remove element');
  });

  useContextProvider<CanvaContextState>(CanvaContext, {
    currentComponent,
    componentData,
    components,
    setCurrentComponent,
    rotateElement,
    removeElement,
    resizeElement,
    moveElement,
  });

  return (
    <div class='relative flex h-[calc(100vh-64px)]'>
      <Slot />
    </div>
  );
});
