import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div>
      <div class='flex h-[250px] w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-dark to-dark-purple'>
        <button class='rounded-md bg-off-blue px-4 py-2 text-center font-medium text-white hover:bg-green'>
          Custom size
        </button>
        <div>
          <h2 class='py-6 text-3xl font-semibold text-white'>
            What will you design today
          </h2>
        </div>
      </div>
      <div>
        <h2 class='py-6 text-xl font-semibold text-white'>
          Your recent designs
        </h2>
      </div>
    </div>
  );
});
