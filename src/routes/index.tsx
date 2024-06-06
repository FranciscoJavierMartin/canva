import { $, component$, useContext, useTask$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { PortalAPI } from '@/presentation/contexts/portal-api';
import Modal from '@/presentation/ui/modal/route-model/modal';
import LoginForm from '@/presentation/components/forms/login-form';
import RegisterForm from '@/presentation/components/forms/register-form';
import Navbar from '@/presentation/ui/Navbar';

export default component$(() => {
  const location = useLocation();
  const portal = useContext(PortalAPI);
  const openLoginForm = $(() =>
    portal(
      'modal',
      <Modal>
        <LoginForm />
      </Modal>,
    ),
  );
  const openRegisterForm = $(() =>
    portal(
      'modal',
      <Modal>
        <RegisterForm />
      </Modal>,
    ),
  );

  useTask$(({ track }) => {
    track(() => location.url.search);

    if (location.url.searchParams.get('modal')) {
      if (location.url.searchParams.get('form') === 'login') {
        openLoginForm();
      } else if (location.url.searchParams.get('form') === 'register') {
        openRegisterForm();
      }
    }
  });

  return (
    <div class='min-h-screen w-full bg-black'>
      <Navbar>
        <Link
          href='/?modal=true&form=login'
          class='button w-[80px] bg-teal-700 hover:bg-teal-500'
        >
          Sign In
        </Link>
        <Link
          href='/?modal=true&form=register'
          class='button w-[80px] bg-purple-700 hover:bg-purple-500'
        >
          Sign Up
        </Link>
      </Navbar>

      <div class='size-full items-center justify-center p-4'>
        <div class='flex h-full flex-col items-center justify-center gap-6 pt-44 text-center'>
          <h2 class='text-5xl font-bold text-light-gray'>
            What you will design today?
          </h2>
          <span class='text-2xl font-medium text-mid-gray'>
            Canva makes it easy to create and share professional designs,
          </span>
          <Link
            href='/?modal=true&form=register'
            class='button w-[200px] bg-purple-700 hover:bg-purple-500'
          >
            Sign Up for Free
          </Link>
        </div>
      </div>
    </div>
  );
});
