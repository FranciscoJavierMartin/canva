import { component$, useContext, useTask$ } from '@builder.io/qwik';
import {
  Form,
  type RequestEventAction,
  globalAction$,
  zod$,
  Link,
} from '@builder.io/qwik-city';
import InputForm from '@/presentation/ui/inputs/input-form';
import { PortalCloseAPIContextId } from '@/presentation/contexts/portal-close';
import { registerSchema } from '@/core/validators/registerSchema';

export const useRegisterUser = globalAction$(
  async (data, { redirect }: RequestEventAction) => {
    console.log(data);
    redirect(302, '/home');
    return {
      message: 'Ups, something went wrong. Please try again.',
      // errors: {},
    };
  },
  zod$(registerSchema),
);

export default component$(() => {
  const registerUser = useRegisterUser();
  const closePortal = useContext(PortalCloseAPIContextId);

  useTask$(({ cleanup }) => {
    cleanup(() => {
      closePortal();
    });
  });

  return (
    <div class='w-full'>
      <h2 class='text-center text-2xl text-white'>Sign Up</h2>
      <Form action={registerUser} class='mb-3 flex flex-col gap-2'>
        <InputForm
          id='name'
          name='name'
          placeholder='Name'
          errors={registerUser.value?.fieldErrors?.name}
        />
        <InputForm
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          errors={registerUser.value?.fieldErrors?.email}
        />
        <InputForm
          id='password'
          name='password'
          type='password'
          placeholder='Password'
          errors={registerUser.value?.fieldErrors?.password}
        />
        <button
          disabled={registerUser.isRunning}
          class='mt-6 w-full rounded-md bg-purple-500 px-3 py-2 font-semibold text-white outline-none hover:bg-purple-600 disabled:bg-purple-400'
        >
          Sign Up
        </button>
        {registerUser.value?.message && (
          <p class='text-sm text-red-400'>{registerUser.value.message}</p>
        )}
      </Form>
      <hr class='mb-3 mt-5' />
      <span class='mb-2 flex w-full justify-center gap-1 text-center text-white'>
        Have an account?{' '}
        <Link
          href='?modal=true&form=login'
          class='cursor-pointer text-blue-400 hover:underline'
        >
          Sign In
        </Link>
      </span>
    </div>
  );
});
