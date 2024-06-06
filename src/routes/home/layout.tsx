import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import Navbar from '@/presentation/ui/Navbar';
import Settings from '@/presentation/icons/settings';
import Logout from '@/presentation/icons/logout';
import {
  type NavLinkProps,
  default as NavLink,
} from '@/presentation/components/sidebar/NavLink';
import HomeIcon from '@/presentation/icons/home';
import Folder from '@/presentation/icons/folder';
import TemplateIcon from '@/presentation/icons/template';

const navLinksSidebar: NavLinkProps[] = [
  {
    text: 'Home',
    href: '/home',
    Icon: HomeIcon,
  },
  {
    text: 'Projects',
    href: '/home/projects',
    Icon: Folder,
  },
  {
    text: 'Templates',
    href: '/home/templates',
    Icon: TemplateIcon,
  },
];

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
        <div class='absolute right-1 top-16 hidden w-64 border border-gray-700 bg-darker-gray pt-1 transition duration-500 peer-focus-within:block'>
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
      <div class='flex w-full'>
        <aside class='h-[calc(100vh-69px)] w-[300px] bg-blue-steel p-5'>
          <div class='mb-3 flex items-center justify-start gap-5 p-2'>
            <img
              class='size-[40px] rounded-full'
              src='https://templates-flatlogic.herokuapp.com/sing-app/html5/demo/img/people/a5.jpg'
              alt='User avatar'
              height={40}
              width={40}
            />
            <div class='flex flex-col items-start justify-center'>
              <span class='text-base font-bold text-lighter-gray'>
                John Doe
              </span>
              <span class='text-sm text-lighter-gray'>Free</span>
            </div>
          </div>
          <ul class='flex flex-col gap-2'>
            {navLinksSidebar.map((navLink, index) => (
              <NavLink key={index} {...navLink} />
            ))}
          </ul>
        </aside>
        <main class='p-4'>
          <Slot />
        </main>
      </div>
    </div>
  );
});
