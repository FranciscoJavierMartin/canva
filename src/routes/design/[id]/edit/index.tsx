import { component$ } from '@builder.io/qwik';
import Navbar from '@/presentation/ui/Navbar';
import Sidebar from '@/presentation/components/sidebar/sidebar';

export default component$(() => {
  return (
    <div class='min-w-screen h-screen bg-black'>
      <Navbar>
        <div class='flex items-center justify-center gap-2 text-gray-200'>
          <button class='button bg-purple-blue px-3'>Save</button>
          <button class='button bg-purple-bright px-3'>Download</button>
        </div>
      </Navbar>
      <Sidebar />
      <div class='h-full'>
        
      </div>
    </div>
  );
});
