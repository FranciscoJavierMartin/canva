import {
  component$,
  useComputed$,
  useContext,
  useSignal,
} from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

type ToolsProps = {};

export default component$<ToolsProps>(() => {
  const canvaContext = useContext(CanvaContext);
  const isOpen = useComputed$(() => !!canvaContext.currentComponent.value);
  const value = useSignal<number>(100);

  return (
    <aside
      class={[
        'absolute right-0 z-10 h-full w-[250px] translate-x-0 bg-black-light text-gray-300 transition-transform duration-300',
      ]}
    >
      <div class='mt-4 grid grid-cols-[auto_1fr] justify-start gap-x-3 gap-y-4 px-3'>
        <span class='self-center'>Color</span>
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
        <span class='self-center'>Opacity</span>
        <input type='range' min={0.1} step={0.05} max={1} class='input-range' />
        <span class='self-center'>Z index</span>
        <input
          type='number'
          step={1}
          min={0}
          max={9999}
          class='remove-input-number-indicator input-numeric-sidebar'
        />
        <span class='self-center'>Radius</span>
        <input
          type='number'
          step={1}
          min={0}
          max={100}
          class='remove-input-number-indicator input-numeric-sidebar'
        />
        <span class='self-center'>Padding</span>
        <input
          type='number'
          step={1}
          min={0}
          max={100}
          class='remove-input-number-indicator input-numeric-sidebar'
        />
        <span class='self-center'>Font size</span>
        <input
          type='number'
          step={1}
          min={1}
          max={72}
          class='remove-input-number-indicator input-numeric-sidebar'
        />
        <span class='self-center'>Font weight</span>
        <input
          type='range'
          step={100}
          min={100}
          max={900}
          class='remove-input-number-indicator input-range'
          value={value.value}
          onChange$={(event: Event, element: HTMLInputElement) => {
            value.value = parseInt(element.value);
          }}
        />
        <textarea
          rows={1}
          placeholder='Enter text here...'
          class='no-scrollbar col-span-2 max-h-44 w-full rounded-md border border-[#404040] bg-transparent px-2 py-2 text-sm outline-none'
          onInput$={(event: Event, element: HTMLTextAreaElement) => {
            element.style.height = `${element.scrollHeight}px`;
            // canvaContext.componentData.zIndex = parseInt(element.value);
          }}
        />
      </div>
    </aside>
  );
});
