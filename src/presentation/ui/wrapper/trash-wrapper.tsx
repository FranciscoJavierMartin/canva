import { Slot, component$ } from '@builder.io/qwik';
import TrashIcon from '@/presentation/icons/trash';

export default component$(() => {
  return (
    <div class='group relative h-[170px] w-full px-2'>
      <Slot />
      <button class='absolute right-5 top-3 hidden cursor-pointer rounded-md bg-white p-1 text-red-500 transition-all duration-500 group-hover:block'>
        <TrashIcon />
      </button>
    </div>
  );
});
