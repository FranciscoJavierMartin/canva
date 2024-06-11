import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class='grid grid-cols-3 gap-2'>
      <button class='h-[90px] bg-gray-dark'>
        <span class='sr-only'>Square</span>
      </button>
      <button class='h-[90px] rounded-full bg-gray-dark'>
        <span class='sr-only'>Circle</span>
      </button>
      <button
        style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%' }}
        class='h-[90px] bg-gray-dark'
      >
        <span class='sr-only'>Triangle</span>
      </button>
    </div>
  );
});
