import { component$ } from '@builder.io/qwik';
import Navbar from '@/presentation/ui/Navbar';
import Sidebar from '@/presentation/components/sidebar/sidebar';
import ArrowLeft from '@/presentation/icons/arrow-left';

export default component$(() => {
  return (
    <div class='min-w-screen h-screen bg-black'>
      <Navbar>
        <div class='flex items-center justify-center gap-2 text-gray-200'>
          <button class='button bg-purple-blue px-3'>Save</button>
          <button class='button bg-purple-bright px-3'>Download</button>
        </div>
      </Navbar>
      <div class='flex h-[calc(100vh-64px)]'>
        <Sidebar />
        <div
          class={['bg-black-light relative z-10 w-[350px]', { 'p-0': true }]}
        >
          <button class='bg-black-light absolute -right-2 top-[calc(50%-50px)] flex h-[100px] w-[15px] items-center justify-center rounded-full text-slate-300 hover:text-gray-100'>
            <ArrowLeft />
          </button>
        </div>
      </div>
    </div>
  );
});
