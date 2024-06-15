import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import Logo from '@/presentation/icons/logo';

export default component$(() => {
  return (
    <header class='z-30 w-full bg-black-mid shadow-md'>
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
