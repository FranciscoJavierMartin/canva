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
  ImageInfo,
  ShapeInfo,
  TextInfo,
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
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    opacity: 1,
    zIndex: 0,
    radius: 0,
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
        zIndex: 0,
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
      componentData.left = parseInt(currentDiv?.style.left || '0');
      componentData.top = parseInt(currentDiv?.style.top || '0');
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
      componentData.width = parseInt(currentDiv?.style.width || '0');
      componentData.height = parseInt(currentDiv?.style.width || '0');
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
      componentData.height,
      componentData.width,
      componentData.top,
      componentData.left,
      componentData.opacity,
      componentData.zIndex,
      componentData.padding,
      componentData.fontSize,
      componentData.fontWeight,
      componentData.text,
      componentData.radius,
    ]);

    if (currentComponent.value) {
      // TODO: Add support for text resize and rotate
      if (
        currentComponent.value.name === 'shape' ||
        currentComponent.value.name === 'image'
      ) {
        (components[currentComponentId.value] as ShapeInfo).rotation =
          componentData.rotation || currentComponent.value.rotation;
        (components[currentComponentId.value] as ShapeInfo).width =
          componentData.width || currentComponent.value.width;
        (components[currentComponentId.value] as ShapeInfo).height =
          componentData.height || currentComponent.value.height;
      }

      if (currentComponent.value.name === 'text') {
        (components[currentComponentId.value] as TextInfo).fontSize =
          componentData.fontSize || currentComponent.value.fontSize;
        (components[currentComponentId.value] as TextInfo).padding =
          componentData.padding || currentComponent.value.padding;
        (components[currentComponentId.value] as TextInfo).fontWeight =
          componentData.fontWeight || currentComponent.value.fontWeight;
        (components[currentComponentId.value] as TextInfo).text =
          componentData.text || currentComponent.value.text;
      }

      if (currentComponent.value.name === 'image') {
        (components[currentComponentId.value] as ImageInfo).radius =
          componentData.radius || currentComponent.value.radius;
      }

      if (currentComponent.value.name === 'main_frame' && componentData.image) {
        (components[currentComponentId.value] as { image: string }).image =
          componentData.image || currentComponent.value.image;
      }

      if (currentComponent.value.name !== 'main_frame') {
        (
          components[currentComponentId.value] as { left: number; top: number }
        ).left = componentData.left || currentComponent.value.left;
        (
          components[currentComponentId.value] as { left: number; top: number }
        ).top = componentData.top || currentComponent.value.top;
        (components[currentComponentId.value] as { opacity: number }).opacity =
          componentData.opacity || currentComponent.value.opacity;
        components[currentComponentId.value].zIndex =
          componentData.zIndex || currentComponent.value.zIndex;
      }

      components[currentComponentId.value].color =
        componentData.color || currentComponent.value.color;

      componentData.color = '';
      componentData.rotation = 0;
      componentData.height = 0;
      componentData.width = 0;
      componentData.left = 0;
      componentData.top = 0;
      componentData.opacity = 0;
      componentData.zIndex = 0;
      componentData.fontSize = undefined;
      componentData.padding = undefined;
      componentData.fontWeight = undefined;
      componentData.text = '';
    }
  });

  return (
    <div class='relative flex h-[calc(100vh-64px)]'>
      <Slot />
    </div>
  );
});
