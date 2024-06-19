import { component$, useComputed$, type PropsOf } from '@builder.io/qwik';

type InputSliderProps = PropsOf<'input'> & {
  type?: 'range';
  value: number;
  min: number;
  max: number;
};

export default component$<InputSliderProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ type, value, min, max, ...props }) => {
    const left = useComputed$<string>(() => {
      const percentage = (100 * (value - min)) / (max - min);
      const offset = 8 + 16 * (percentage / 100);
      return `calc(${percentage}% - ${offset}px)`;
    });

    return (
      <div class='relative flex justify-center self-center'>
        <input
          {...props}
          type='range'
          value={value}
          min={min}
          max={max}
          class={['input-range', 'peer', 'w-full', props.class]}
        />
        <output
          class='absolute -top-8 flex w-8 justify-center rounded-md bg-white px-2 text-center text-black peer-hover:flex peer-active:flex'
          style={{
            left: left.value,
          }}
        >
          {value}
        </output>
      </div>
    );
  },
);
