import { component$ } from '@builder.io/qwik';
import {
  Form,
  type RequestEventAction,
  globalAction$,
  z,
  zod$,
} from '@builder.io/qwik-city';
import InputForm from '@/presentation/ui/inputs/input-form';

export const useLoginUser = globalAction$(
  async (data, requestEvent: RequestEventAction) => {
    console.log(data);

    return {
      message: '',
      // errors: {},
    };
  },
  zod$({
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Invalid email'),
    password: z
      .string({ required_error: 'Password is required' })
      .trim()
      .min(6, 'Password is too short'),
  }),
);

export default component$(() => {
  const loginUser = useLoginUser();

  return (
    <>
      <h2 class='text-center text-2xl text-white'>Sign In</h2>
      <Form action={loginUser} class='mb-3 flex flex-col gap-2' >
        <InputForm
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          errors={loginUser.value?.fieldErrors?.email}
        />
        <InputForm
          id='password'
          name='password'
          type='password'
          placeholder='Password'
          errors={loginUser.value?.fieldErrors?.password}
        />
        <p class='my-5'>
          {JSON.stringify(loginUser.value?.fieldErrors?.password)}
        </p>
        <button
          disabled={loginUser.isRunning}
          class='mt-6 w-full rounded-md bg-purple-500 px-3 py-2 font-semibold text-white outline-none hover:bg-purple-600 disabled:bg-purple-400'
        >
          Sign In
        </button>
      </Form>
    </>
  );
});
