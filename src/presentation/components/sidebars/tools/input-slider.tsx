import {
  component$,
  useSignal,
  useContext,
  type PropsOf,
} from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

type InputSliderProps = Partial<PropsOf<'input'> & { type: 'range' }>;

export default component$<InputSliderProps>(({ type = 'range', ...props }) => {
  const bubbleRef = useSignal<HTMLOutputElement>();
  const canvaContext = useContext(CanvaContext);

  return canvaContext.currentComponent.value &&
    canvaContext.currentComponent.value.name !== 'main_frame' ? (
    <div class='relative flex justify-center self-center'>
      <input
        type={type}
        {...props}
        min={0.1}
        step={0.1}
        max={1}
        value={canvaContext.currentComponent.value.opacity}
        class='input-range peer w-full'
        onInput$={(event: Event, element: HTMLInputElement) => {
          canvaContext.componentData.opacity = parseFloat(element.value);
        }}
      />
      <output
        ref={bubbleRef}
        class='absolute -top-8 hidden text-center peer-hover:block peer-active:block'
        style={{
          left: `calc(${canvaContext.currentComponent.value.opacity * 100}% - 20px)`,
        }}
      >
        {canvaContext.currentComponent.value.opacity}
      </output>
    </div>
  ) : null;
});

{
  /* <div class='relative'>
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
    </div> */
}
