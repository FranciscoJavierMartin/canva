import { component$, $, useContext } from '@builder.io/qwik';
import { createId } from '@paralleldrive/cuid2';
import { CanvaContext } from '@/presentation/contexts/canva/canva';
import type { ShapeInfo } from '@/interfaces/components.interface';

export default component$(() => {
  const canvaContext = useContext(CanvaContext);

  const createShape = $((type: 'rect' | 'circle' | 'triangle'): void => {
    const shape: ShapeInfo = {
      id: createId(),
      type,
      name: 'shape',
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      zIndex: 1,
      color: '#3c3c3d',
      rotation: 0,
      image: '',
    };

    canvaContext.components[shape.id] = shape;
  });

  return (
    <div class='grid grid-cols-3 gap-2'>
      <button
        class='h-[90px] bg-gray-dark transition-colors hover:bg-gray-mid'
        onClick$={() => createShape('rect')}
      >
        <span class='sr-only'>Square</span>
      </button>
      <button
        class='size-[90px] rounded-full bg-gray-dark transition-colors hover:bg-gray-mid'
        onClick$={() => createShape('circle')}
      >
        <span class='sr-only'>Circle</span>
      </button>
      <button
        style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%' }}
        class='h-[90px] bg-gray-dark transition-colors hover:bg-gray-mid'
        onClick$={() => createShape('triangle')}
      >
        <span class='sr-only'>Triangle</span>
      </button>
    </div>
  );
});
