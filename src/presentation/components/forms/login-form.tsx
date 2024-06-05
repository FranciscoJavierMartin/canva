import InputForm from '@/presentation/ui/inputs/input-form';
import { component$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <h2 class='text-center text-2xl text-white'>Sign In</h2>
      <Form class='flex flex-col gap-2'>
        <InputForm name='email' id='email' placeholder='Email' type='email' />
        <InputForm
          name='password'
          id='password'
          placeholder='Password'
          type='password'
        />
        <button>Sign In</button>
      </Form>
    </>
  );
});
