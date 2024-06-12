import {
  $,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
  type Signal,
} from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';
import type { ComponentInfo } from '@/interfaces/types/components';
import type {
  CanvaContextState,
  ComponentData,
} from '@/interfaces/types/canva';

export default component$(() => {
  const componentData = useStore<ComponentData>({
    color: '',
    image: '',
  });

  const setCurrentComponent = $((component: ComponentInfo) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (currentComponent?.value) {
      currentComponent.value = component;
    }
  });

  // TODO: Use useStore
  // TODO: An alternative is keep the index instead of the current object
  // eslint-disable-next-line qwik/use-method-usage
  const currentComponent: Signal<ComponentInfo | undefined> = useSignal<
    ComponentInfo | undefined
  >({
    name: 'main_frame',
    type: 'rect',
    id: Math.floor(Math.random() * 10_000 + 1),
    height: 500,
    width: 650,
    zIndex: 1,
    color: '#fff',
    image: '',
    setCurrentComponent: $(() => {}),
  });

  const components = useStore<ComponentInfo[]>([currentComponent.value!], {
    deep: true,
  });

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

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => [componentData.color, componentData.image]);

    if (currentComponent.value) {
      const index = components.findIndex(
        (c) => c.id === currentComponent.value?.id,
      );

      console.log(currentComponent.value.name, componentData.image);

      if (currentComponent.value.name === 'main_frame' && componentData.image) {
        components[index].image =
          componentData.image || currentComponent.value.image;
      }

      components[index].color =
        componentData.color || currentComponent.value.color;
    }
  });

  return (
    <div class='relative flex h-[calc(100vh-64px)]'>
      <Slot />
    </div>
  );
});
