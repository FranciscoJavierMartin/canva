import { Slot, component$ } from '@builder.io/qwik';
import Navbar from '@/presentation/ui/Navbar';
import { Link } from '@builder.io/qwik-city';
import Settings from '@/presentation/icons/settings';
import Logout from '@/presentation/icons/logout';

export default component$(() => {
  return (
    <div class='min-h-screen w-full bg-black'>
      <Navbar>
        <Link
          href='/design/create'
          class='button bg-light-purple px-2 hover:bg-purple-bright'
        >
          Create a design
        </Link>
        <button class='peer'>
          <img
            class='size-[45px] rounded-full'
            src='https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg'
            alt='User avatar'
            height={45}
            width={45}
          />
        </button>
        <div class='absolute -right-4 top-14 w-64 border border-gray-700 bg-darker-gray pt-1 transition duration-500'>
          <div class='flex items-center justify-start gap-5 p-3'>
            <img
              class='size-[40px] rounded-full'
              src='https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg'
              alt='User avatar'
              height={40}
              width={40}
            />
            <div class='flex flex-col items-start justify-center'>
              <span class='text-sm font-bold text-lighter-gray'>John Doe</span>
              <span class='text-sm font-bold text-lighter-gray'>
                john@doe.com
              </span>
            </div>
          </div>
          <ul class='text-lighter-gray'>
            <li class='p-1 transition hover:bg-mid-black'>
              <Link class='flex gap-2 p-2' href='/'>
                <Settings />
                Settings
              </Link>
            </li>
            <li class='border-t px-1 pb-1 pt-2 transition hover:bg-mid-black'>
              <Link href='/' class='flex gap-2 p-2'>
                <Logout />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </Navbar>
      <Slot />
    </div>
  );
});
