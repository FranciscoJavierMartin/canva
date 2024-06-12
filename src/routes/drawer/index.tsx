import Navbar from '@/presentation/ui/Navbar';
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class='min-w-screen h-screen bg-black'>
      <Navbar>
        <div class='flex items-center justify-center gap-2 text-gray-200'>
          <button class='button bg-purple-blue px-3'>Save</button>
          <button class='button bg-purple-bright px-3'>Download</button>
        </div>
      </Navbar>
      <div class='relative flex h-[calc(100vh-64px)]'>
        <aside class='w-[85px] bg-emerald-200'>
          <button class='p-2 text-white'>Icon</button>
        </aside>
        <aside class='absolute left-[85px] z-30 w-[350px] bg-yellow-400 text-emerald-600'>
          Sidebar menu
        </aside>
        <div class='w-[calc(100vw-85px)] bg-blue-400'>
          <h1 class='text-blue-500'>Hello world</h1>
        </div>
      </div>
    </div>
  );
});
