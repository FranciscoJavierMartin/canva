import { component$ } from '@builder.io/qwik';
import Navbar from '@/presentation/ui/Navbar';
import Sidebar from '@/presentation/components/sidebar/sidebar';

export default component$(() => {
  return (
    <div class='min-w-screen grid-template-areas-edit-page-container grid h-screen grid-cols-[85px_350px_auto_250px] grid-rows-[64px_auto] bg-black'>
      <Navbar>
        <div class='flex items-center justify-center gap-2 text-gray-200'>
          <button class='button bg-purple-blue px-3'>Save</button>
          <button class='button bg-purple-bright px-3'>Download</button>
        </div>
      </Navbar>
      <Sidebar />
      <div class='grid-area-design h-full'></div>
      <div class='bg-black-light grid-area-tools z-10 h-full w-[250px] px-3 py-2 text-gray-300'>
        <div class='flex h-full flex-col items-start justify-start gap-6 px-3'>
          <h1 class='text-white'>Tools</h1>
        </div>
      </div>
    </div>
  );
});
