import { $, component$, useContext } from '@builder.io/qwik';
import { createId } from '@paralleldrive/cuid2';
import type { TextInfo } from '@/interfaces/components.interface';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

export default component$(() => {
  const canvaContext = useContext(CanvaContext);

  const createText = $((): void => {
    const text: TextInfo = {
      id: createId(),
      name: 'text',
      type: 'rect',
      left: 10,
      top: 10,
      opacity: 1,
      rotation: 0,
      zIndex: 1,
      padding: 6,
      fontSize: 22,
      text: 'Add you text',
      fontWeight: 400,
      color: '#3c3c3d',
    };

    canvaContext.components[text.id] = text;
  });

  return (
    <div class='grid grid-cols-1 gap-2'>
      <button
        onClick$={createText}
        class='rounded-md bg-gray-dark p-3 text-center text-xl font-bold text-white'
      >
        Add text
      </button>
    </div>
  );
});
