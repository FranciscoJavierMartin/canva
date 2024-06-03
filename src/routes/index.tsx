import { component$ } from '@builder.io/qwik';
import Logo from '@/components/icons/logo';

export default component$(() => {
  return (
    <div class='min-h-screen w-full bg-black'>
      <div class='bg-mid-black shadow-md'>
        <div class='m-auto w-[93%] py-3'>
          <div class='h-[30px] w-[80px]'>
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
});
