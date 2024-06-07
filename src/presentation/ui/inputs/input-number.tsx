import { type InputHTMLAttributes, component$ } from '@builder.io/qwik';

type InputNumber = InputHTMLAttributes<HTMLInputElement> & {
  errors?: string[];
  text: string;
};

export default component$<InputNumber>(({ errors = [], text, ...props }) => {
  return (
    <div class='flex flex-col items-start justify-center gap-2'>
      <label for={props.id}>{text}</label>
      <input
        {...props}
        type='number'
        class='w-full rounded-md border border-[#404040] bg-[#1b1a1a] px-2 py-1 outline-none'
      />
    </div>
  );
});
