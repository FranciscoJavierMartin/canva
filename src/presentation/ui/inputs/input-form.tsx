import { type InputHTMLAttributes, component$ } from '@builder.io/qwik';

type InputForm = InputHTMLAttributes<HTMLInputElement> & { errors?: string[] };

export default component$<InputForm>(({ errors = [], ...props }) => {
  return (
    <>
      <div class='relative mx-0 mb-7 mt-5 w-full text-white'>
        <div class='absolute flex w-full items-center rounded-md border-0 border-b-2 border-solid border-[#5c5c5e] focus-within:border-purple-500'>
          <input
            {...props}
            class={['peer flex-grow bg-transparent px-3 py-2 outline-none']}
          />
          <label
            for={props.id}
            class={`absolute left-0 top-0 px-3 py-2 transition-all peer-focus-within:-top-3 peer-focus-within:p-0 peer-focus-within:text-xs peer-focus-within:text-purple-500 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:p-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-purple-500`}
          >
            {props.placeholder}
          </label>
        </div>
      </div>
      <div>
        {errors.length > 0 &&
          errors.map((error) => (
            <p key={error} class='ml-2 mt-2 text-sm text-red-400'>
              {error}
            </p>
          ))}
      </div>
    </>
  );
});
