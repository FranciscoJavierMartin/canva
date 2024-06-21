import { component$, useContext } from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

export default component$(() => {
  const canvaContext = useContext(CanvaContext);

  return (
    <div class='grid grid-cols-3 gap-2'>
      <button
        class='size-[90px] bg-gray-dark transition-colors hover:bg-gray-mid'
        onClick$={() => canvaContext.createShape('rect')}
      >
        <span class='sr-only'>Square</span>
      </button>
      <button
        class='size-[90px] rounded-full bg-gray-dark transition-colors hover:bg-gray-mid'
        onClick$={() => canvaContext.createShape('circle')}
      >
        <span class='sr-only'>Circle</span>
      </button>
      <button
        style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%' }}
        class='size-[90px] bg-gray-dark transition-colors hover:bg-gray-mid'
        onClick$={() => canvaContext.createShape('triangle')}
      >
        <span class='sr-only'>Triangle</span>
      </button>
    </div>
  );
});
