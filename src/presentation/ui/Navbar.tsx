import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import Logo from '@/presentation/icons/logo';

export default component$(() => {
  return (
    <header class='bg-white z-30 w-full shadow-md dark:bg-black-mid'>
      <div class='m-auto p-3'>
        <nav class='flex items-center justify-between'>
          <Link href='/home' class='h-[30px] w-[80px]'>
            <Logo />
          </Link>
          <div class='center-elements gap-4'>
            <Slot />
          </div>
        </nav>
      </div>
    </header>
  );
});
