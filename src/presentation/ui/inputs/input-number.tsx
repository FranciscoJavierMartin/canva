import { component$, type QwikIntrinsicElements } from '@builder.io/qwik';

type InputNumber = QwikIntrinsicElements['input'] & {
  text: string;
};

export default component$<InputNumber>(({ text, ...props }) => {
  return (
    <div class='flex flex-col items-start justify-center gap-2'>
      <label for={props.id} class='-mb-1 ml-2'>
        {text}
      </label>
      <input
        type='number'
        class='remove-input-number-indicator w-full rounded-md border border-[#404040] bg-[#1b1a1a] px-2 py-1 text-right outline-none placeholder:text-left'
        max={100_000}
        {...props}
      />
    </div>
  );
});
