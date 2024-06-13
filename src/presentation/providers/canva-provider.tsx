import {
  $,
  Slot,
  component$,
  useComputed$,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';
import type { ComponentInfo } from '@/interfaces/components.interface';
import type {
  CanvaContextState,
  ComponentData,
  ComponentsStore,
} from '@/interfaces/canva.interface';
import { createId } from '@paralleldrive/cuid2';

export default component$(() => {
  const componentData = useStore<ComponentData>({
    color: '',
    image: '',
  });

  // TODO: Use useStore
  // TODO: An alternative is keep the index or the id instead of the current object
  // TODO: Use computed property to get current component
  // An alternative is use an object or a Map like {[uuid]: component}

  const currentId = useSignal<string>(createId());

  const setCurrentComponent = $((component: ComponentInfo) => {
    currentId.value = component.id;
  });

  const components = useStore<ComponentsStore>(
    {
      [currentId.value]: {
        name: 'main_frame',
        type: 'rect',
        id: currentId.value,
        height: 500,
        width: 650,
        zIndex: 1,
        color: '#fff',
        image: '',
        setCurrentComponent: $(() => {}),
      },
    },
    {
      deep: true,
    },
  );

  const currentComponent = useComputed$<ComponentInfo | undefined>(() =>
    currentId.value ? components[currentId.value] : undefined,
  );

  const moveElement = $(() => {
    console.log('Move element');
  });

  const resizeElement = $(() => {
    console.log('Resize element');
  });

  const rotateElement = $(() => {
    console.log('Rotate element');
  });

  const removeElement = $((id: string) => {
    delete components[id];
    currentId.value = '';
  });

  const removeBackground = $(() => {
    // const index = components.findIndex(
    //   (c) => c.id === currentComponent.value?.id,
    // );
    // components[index].image = '';
    // componentData.image = '';
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
    removeBackground,
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => [componentData.color, componentData.image]);

    // if (currentComponent.value) {
    //   const index = components.findIndex(
    //     (c) => c.id === currentComponent.value?.id,
    //   );

    //   if (currentComponent.value.name === 'main_frame' && componentData.image) {
    //     components[index].image =
    //       componentData.image || currentComponent.value.image;
    //   }

    //   components[index].color =
    //     componentData.color || currentComponent.value.color;
    // }
  });

  return (
    <div class='relative flex h-[calc(100vh-64px)]'>
      <Slot />
    </div>
  );
});
