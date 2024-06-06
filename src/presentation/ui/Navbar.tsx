import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import Logo from '../icons/logo';

export default component$(() => {
  return (
    <div class='w-full bg-mid-black shadow-md'>
      <div class='m-auto p-3'>
        <div class='flex items-center justify-between'>
          <Link href='/home' class='h-[30px] w-[80px]'>
            <Logo />
          </Link>
          <div class='flex items-center justify-center gap-4'>
            <Slot />
          </div>
        </div>
      </div>
    </div>
  );
});
