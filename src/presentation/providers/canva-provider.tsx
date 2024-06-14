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
import { createId } from '@paralleldrive/cuid2';
import { CanvaContext } from '@/presentation/contexts/canva/canva';
import type {
  ComponentInfo,
  ShapeInfo,
} from '@/interfaces/components.interface';
import type {
  CanvaContextState,
  ComponentData,
  ComponentsStore,
} from '@/interfaces/canva.interface';

export default component$(() => {
  const componentData = useStore<ComponentData>({
    color: '',
    image: '',
    rotation: 0,
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
    let isMoving: boolean = true;
    setCurrentComponentId(id);
    const currentDiv = document.getElementById(id);

    function mouseMove({ pageX, pageY }: MouseEvent): void {
      if (currentDiv) {
        const boundingRect = currentDiv.getBoundingClientRect();
        const figureCenter = {
          x: boundingRect.left + boundingRect.width / 2,
          y: boundingRect.top + boundingRect.height / 2,
        };

        const angle =
          Math.atan2(pageX - figureCenter.x, -(pageY - figureCenter.y)) *
          (180 / Math.PI);

        if (isMoving) {
          currentDiv.style.transform = `rotate(${angle}deg)`;
        }
      }
    }

    function mouseUp(): void {
      isMoving = false;
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);

      const angle = parseFloat(
        currentDiv?.style.transform
          .split('(')[1]
          .split(')')[0]
          .split(',')[0]
          .replace('deg', '') || '0',
      );

      componentData.rotation = angle;
    }

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  });

  const removeElement = $((id: string): void => {
    delete components[id];
    currentComponentId.value = '';
  });

  const removeBackground = $((): void => {
    (components[currentComponentId.value] as { image: string }).image = '';
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
    track(() => [
      componentData.color,
      componentData.image,
      componentData.rotation,
    ]);

    if (currentComponent.value) {
      if (currentComponent.value.name === 'shape') {
        (components[currentComponentId.value] as ShapeInfo).rotation =
          componentData.rotation || currentComponent.value.rotation;
      }

      if (currentComponent.value.name === 'main_frame' && componentData.image) {
        (components[currentComponentId.value] as { image: string }).image =
          componentData.image || currentComponent.value.image;
      }

      components[currentComponentId.value].color =
        componentData.color || currentComponent.value.color;

      componentData.color = '';
      componentData.rotation = 0;
    }
  });

  return (
    <div class='relative flex h-[calc(100vh-64px)]'>
      <Slot />
    </div>
  );
});
