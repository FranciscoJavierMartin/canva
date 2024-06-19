import {
  component$,
  useSignal,
  useContext,
  type PropsOf,
} from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

type InputSliderProps = {}; //PropsOf<'input'> & { type?: 'range' };

export default component$<InputSliderProps>(({ ...props }) => {
  const bubbleRef = useSignal<HTMLOutputElement>();
  const canvaContext = useContext(CanvaContext);

  return canvaContext.currentComponent.value &&
    canvaContext.currentComponent.value.name !== 'main_frame' ? (
    <div class='relative flex justify-center self-center'>
      <input
        type='range'
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
        class='absolute -top-8 hidden w-8 justify-center rounded-md bg-white px-2 text-center text-black peer-hover:flex peer-active:flex'
        style={{
          left: `calc(${canvaContext.currentComponent.value.opacity * 100}% - 25px)`,
        }}
      >
        {canvaContext.currentComponent.value.opacity}
      </output>
    </div>
  ) : null;
});
