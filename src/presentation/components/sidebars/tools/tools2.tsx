import { component$, useComputed$, useContext } from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

type ToolsProps = {};

export default component$<ToolsProps>(() => {
  const canvaContext = useContext(CanvaContext);
  const isOpen = useComputed$(() => !!canvaContext.currentComponent.value);

  return (
    <aside
      class={[
        'absolute right-0 z-10 h-full w-[250px] translate-x-0 bg-black-light text-gray-300 transition-transform duration-300',
      ]}
    >
      <div class='grid grid-cols-2'>
        <span>Color</span>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label for='color-input' class='size-[30px] rounded-md'></label>
        <input type='color' class='hidden' id='color-input' />
      </div>
    </aside>
  );
});
