import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import Logo from '../icons/logo';

export default component$(() => {
  return (
    <div class='w-full bg-mid-black shadow-md'>
      <div class='m-auto w-[93%] py-3'>
        <div class='flex items-center justify-between'>
          <Link href='/home' class='h-[30px] w-[80px]'>
            <Logo />
          </Link>
          <div class='flex items-center justify-center gap-4'>
            <button class='button bg-light-purple px-2 hover:bg-purple-bright'>
              Create a design
            </button>
            <div>
              <img
                class='h-[45px] w-[48px] rounded-full'
                src='https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg'
                alt='User avatar'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
