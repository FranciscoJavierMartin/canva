import { component$ } from '@builder.io/qwik';
import {
  Form,
  type RequestEventAction,
  globalAction$,
} from '@builder.io/qwik-city';
import InputForm from '@/presentation/ui/inputs/input-form';

export const useCreateNewDesign = globalAction$(
  (data, { redirect }: RequestEventAction) => {},
);

export default component$(() => {
  return (
    <div class='group'>
      <button class='absolute right-3 top-3 rounded-md bg-off-blue px-4 py-2 text-center font-medium text-white hover:bg-blue-dark'>
        Custom size
      </button>
      <Form class='absolute right-3 top-16 z-20 w-[250px] gap-3 bg-light-black p-4 text-white transition-all duration-500'>
        <div class='grid grid-cols-2 gap-3'>
          <InputForm type='number' id='width' name='width' required min={50} />
          <InputForm
            type='number'
            id='height'
            name='height'
            required
            min={50}
          />
        </div>
        <button
          type='submit'
          class='w-full rounded-md bg-off-blue px-4 py-2 text-center font-medium text-white hover:bg-blue-dark'
        >
          Create new design
        </button>
      </Form>
    </div>
  );
});
