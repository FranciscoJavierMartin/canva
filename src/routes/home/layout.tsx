import { Slot, component$ } from '@builder.io/qwik';
import Navbar from '@/presentation/ui/Navbar';

export default component$(() => {
  return (
    <div class='min-h-screen w-full bg-black'>
      <Navbar />
      <Slot />
    </div>
  );
});
