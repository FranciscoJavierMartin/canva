import { component$, useContext, useTask$ } from '@builder.io/qwik';
import {
  Form,
  type RequestEventAction,
  globalAction$,
  zod$,
} from '@builder.io/qwik-city';
import InputForm from '@/presentation/ui/inputs/input-form';
import { PortalCloseAPIContextId } from '@/presentation/contexts/portal-close';
import { registerSchema } from '@/core/validators/registerSchema';

export const useRegisterUser = globalAction$(
  async (data, requestEvent: RequestEventAction) => {
    console.log(data);

    return {
      message: '',
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
    <>
      <h2 class='text-center text-2xl text-white'>Sign Up</h2>
      <Form action={registerUser} class='mb-3 flex flex-col gap-2'>
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
      </Form>
    </>
  );
});
