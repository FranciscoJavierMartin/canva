import { Slot, component$ } from '@builder.io/qwik';
import Navbar from '@/presentation/ui/Navbar';

export default component$(() => {
  return (
    <div class='min-h-screen w-full bg-black'>
      <Navbar>
        <button class='button bg-light-purple px-2 hover:bg-purple-bright'>
          Create a design
        </button>
        <img
          class='size-[45px] rounded-full'
          src='https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg'
          alt='User avatar'
          height={45}
          width={45}
        />
      </Navbar>
      <Slot />
    </div>
  );
});
