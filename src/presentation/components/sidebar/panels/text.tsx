import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class='grid grid-cols-1 gap-2'>
      <div class='cursor-pointer rounded-md bg-gray-dark p-3 text-center text-xl font-bold text-white'>
        <h2>Add text</h2>
      </div>
    </div>
  );
});
