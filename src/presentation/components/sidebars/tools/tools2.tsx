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
      <div class='mt-4 grid grid-cols-2 justify-start gap-y-4 px-3'>
        <span>Color</span>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          for='color-input'
          class='size-[30px] rounded-md'
          style={{ backgroundColor: '#fff' }}
        />
        <input type='color' class='hidden' id='color-input' />
        <button class='button col-span-2 bg-slate-600 px-3'>
          Remove background
        </button>
        <span>Opacity</span>
        <input type='range' min={0.1} step={0.05} max={1} />
        <span>Z index</span>
        <input
          type='number'
          step={1}
          min={0}
          max={9999}
          class='remove-input-number-indicator'
        />
        <span>Radius</span>
        <input type='number' step={1} min={0} max={100} />
        <span>Padding</span>
        <input type='number' step={1} min={0} max={100} />
        <span>Font size</span>
        <input type='number' step={1} min={1} max={72} />
        <span>Font weight</span>
        <input type='number' step={100} min={100} max={900} />
        <textarea class='col-span-2 mt-3 w-full rounded-md' rows={10} />
      </div>
    </aside>
  );
});
