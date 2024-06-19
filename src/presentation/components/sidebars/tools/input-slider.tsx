import { component$, type PropsOf } from '@builder.io/qwik';

type InputSliderProps = PropsOf<'input'> & { type?: 'range'; value: number };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default component$<InputSliderProps>(({ type, ...props }) => {
  return (
    <div class='relative flex justify-center self-center'>
      <input type='range' {...props} />
      <output
        class='absolute -top-8 hidden w-8 justify-center rounded-md bg-white px-2 text-center text-black peer-hover:flex peer-active:flex'
        style={{
          left: `calc(${props.value * 100}% - 25px)`,
        }}
      >
        {props.value}
      </output>
    </div>
  );
});
