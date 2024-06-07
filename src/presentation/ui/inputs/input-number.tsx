import { component$, type QwikIntrinsicElements } from '@builder.io/qwik';

type InputNumber = QwikIntrinsicElements['input'] & {
  text: string;
};

export default component$<InputNumber>(({ text, ...props }) => {
  return (
    <div class='flex flex-col items-start justify-center gap-2'>
      <label for={props.id}>{text}</label>
      <input
        type='number'
        class='w-full rounded-md border border-[#404040] bg-[#1b1a1a] px-2 py-1 outline-none'
        {...props}
      />
    </div>
  );
});
