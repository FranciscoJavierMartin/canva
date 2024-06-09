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
      <div class='h-full flex'>
        <Sidebar />
        <div class='bg-black-light z-10 w-[350px]'>
          <button class='bg-black-light flex h-[100px] w-[20px] items-center justify-center rounded-full text-slate-300'>
            <ArrowLeft />
          </button>
        </div>
      </div>
    </div>
  );
});
