import { component$ } from '@builder.io/qwik';
import Logo from '@/components/icons/logo';

export default component$(() => {
  return (
    <div class='min-h-screen w-full bg-black'>
      <div class='bg-mid-black shadow-md'>
        <div class='m-auto w-[93%] py-3'>
          <div class='flex items-center justify-between'>
            <div class='h-[30px] w-[80px]'>
              <Logo />
            </div>
            <div class='flex gap-4'>
              <button class='bg-teal-700 text-white hover:bg-teal-500 w-[80px] rounded-[5px] py-2 text-center font-medium transition-all'>
                Sign In
              </button>
              <button class='bg-purple-700 text-white hover:bg-purple-500 w-[80px] rounded-[5px] py-2 text-center font-medium transition-all'>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class='h-full w-full items-center justify-center p-4'>
        <div class='flex h-full flex-col items-center justify-center gap-6 pt-44 text-center'>
          <h2 class='text-5xl font-bold text-light-gray'>
            What you will design today?
          </h2>
          <span class='text-2xl font-medium text-mid-gray'>
            Canva makes it easy to create and share professional designs,
          </span>
          <button class='bg-purple-700 text-white hover:bg-purple-500 w-[200px] rounded-[5px] py-2 text-center font-medium transition-all'>
            Sign Up for Free
          </button>
        </div>
      </div>
    </div>
  );
});
