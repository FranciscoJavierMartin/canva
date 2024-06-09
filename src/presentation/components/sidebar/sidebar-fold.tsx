import { component$ } from '@builder.io/qwik';
import ArrowLeft from '@/presentation/icons/arrow-left';

export default component$(() => {
  return (
    <div
      class={[
        'bg-black-light grid-area-sidebar relative z-10 w-[350px]',
        { 'p-0': true },
      ]}
    >
      <button class='bg-black-light absolute -right-2 top-[calc(50%-50px)] flex h-[100px] w-[15px] items-center justify-center rounded-full text-slate-300 hover:text-gray-100'>
        <ArrowLeft />
      </button>
    </div>
  );
});
