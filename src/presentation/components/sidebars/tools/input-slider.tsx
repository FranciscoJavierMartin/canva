import { CanvaContext } from '@/presentation/contexts/canva/canva';
import {
  type QwikIntrinsicElements,
  component$,
  useSignal,
  useContext,
} from '@builder.io/qwik';

type InputSliderProps = Partial<
  Omit<QwikIntrinsicElements['input'], 'type'> & {
    type: 'range';
  }
>;

export default component$<InputSliderProps>(({ ...props }) => {
  const bubbleRef = useSignal<HTMLOutputElement>();
  const canvaContext = useContext(CanvaContext);

  return (
    <div class='col-span-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-4 px-3'>
      <span class='self-center text-sm'>Opacity</span>
      <div class='relative'>
        <input
          type='range'
          min={0.1}
          step={0.05}
          max={1}
          class='input-range peer self-center'
          value={canvaContext.componentData.opacity}
          onChange$={(event: Event, element: HTMLInputElement) => {
            console.log(parseFloat(element.value));
            canvaContext.componentData.opacity = parseFloat(element.value);

            if (bubbleRef.value) {
              const val = parseFloat(element.value || '0');
              const min = parseFloat(element.min || '0');
              const max = parseFloat(element.max || '100');
              const range = max - min;
              const position = ((val - min) / range) * 100;
              const positionOffset = Math.round((20 * position) / 100) - 20 / 2;
              bubbleRef.value.style.left = `calc(${position}% - ${positionOffset}px)`;
            }
          }}
        />
        <output
          ref={bubbleRef}
          class='absolute -top-8 hidden h-6 w-12 rounded bg-white text-center text-black peer-hover:block peer-hover:-translate-x-1/2 peer-active:block peer-active:-translate-x-1/2'
        >
          50
        </output>
      </div>
    </div>
  );
});
