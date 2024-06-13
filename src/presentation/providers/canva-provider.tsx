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

  const currentComponentId = useSignal<string>(createId());

  const setCurrentComponentId = $((componentId: string): void => {
    currentComponentId.value = componentId;
  });

  const components = useStore<ComponentsStore>(
    {
      [currentComponentId.value]: {
        name: 'main_frame',
        type: 'rect',
        id: currentComponentId.value,
        height: 500,
        width: 650,
        zIndex: 1,
        color: '#fff',
        image: '',
      },
    },
    {
      deep: true,
    },
  );

  const currentComponent = useComputed$<ComponentInfo | undefined>(
    () => components[currentComponentId.value],
  );

  const moveElement = $((id: string): void => {
    let isMoving: boolean = true;
    setCurrentComponentId(id);
    const currentDiv = document.getElementById(id);

    function mouseMove({ movementX, movementY }: MouseEvent): void {
      if (currentDiv) {
        const getStyle = window.getComputedStyle(currentDiv);
        const left = parseInt(getStyle.left);
        const top = parseInt(getStyle.top);

        if (isMoving) {
          currentDiv.style.left = `${left + movementX}px`;
          currentDiv.style.top = `${top + movementY}px`;
        }
      }
    }

    function mouseUp(): void {
      isMoving = false;
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    }

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  });

  const resizeElement = $((id: string): void => {
    let isMoving: boolean = true;
    setCurrentComponentId(id);
    const currentDiv = document.getElementById(id);

    function mouseMove({ movementX, movementY }: MouseEvent): void {
      if (currentDiv) {
        const getStyle = window.getComputedStyle(currentDiv);
        const width = parseInt(getStyle.width);
        const height = parseInt(getStyle.height);

        if (isMoving) {
          currentDiv.style.width = `${width + movementX}px`;
          currentDiv.style.height = `${height + movementY}px`;
        }
      }
    }

    function mouseUp(): void {
      isMoving = false;
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    }

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  });

  const rotateElement = $((id: string): void => {
    console.log('Rotate element');
  });

  const removeElement = $((id: string): void => {
    delete components[id];
    currentComponentId.value = '';
  });

  const removeBackground = $((): void => {
    components[currentComponentId.value].image = '';
    componentData.image = '';
  });

  useContextProvider<CanvaContextState>(CanvaContext, {
    currentComponent,
    componentData,
    components,
    setCurrentComponentId,
    rotateElement,
    removeElement,
    resizeElement,
    moveElement,
    removeBackground,
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => [componentData.color, componentData.image]);

    if (currentComponent.value) {
      if (currentComponent.value.name === 'main_frame' && componentData.image) {
        components[currentComponentId.value].image =
          componentData.image || currentComponent.value.image;
      }

      components[currentComponentId.value].color =
        componentData.color || currentComponent.value.color;

      componentData.color = '';
    }
  });

  return (
    <div class='relative flex h-[calc(100vh-64px)]'>
      <Slot />
    </div>
  );
});
