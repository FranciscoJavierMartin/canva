import { component$ } from '@builder.io/qwik';
import {
  Form,
  type RequestEventAction,
  globalAction$,
  zod$,
} from '@builder.io/qwik-city';
import InputNumber from '@/presentation/ui/inputs/input-number';
import { newDesignSizeSchema } from '@/core/validators/new-design-size';

export const useCreateNewDesign = globalAction$(
  ({ width, height }, { redirect }: RequestEventAction) => {
    const queryParams = new URLSearchParams({ width, height });

    redirect(302, `/design/create?${queryParams.toString()}`);
  },
  zod$(newDesignSizeSchema),
);

export default component$(() => {
  const createNewDesign = useCreateNewDesign();

  return (
    <div class='group'>
      <button class='absolute right-3 top-3 rounded-md bg-off-blue px-4 py-2 text-center font-medium text-white hover:bg-blue-dark'>
        Custom size
      </button>
      <Form
        action={createNewDesign}
        class='absolute right-3 top-16 z-20 hidden w-[250px] gap-3 rounded-md bg-light-black p-4 text-white transition-all duration-500 group-focus-within:block'
      >
        <div class='mb-3 grid grid-cols-2 gap-3'>
          <InputNumber
            text='Width'
            id='width'
            name='width'
            placeholder='Width'
            required
            min={50}
            max={100_000}
          />
          <InputNumber
            text='Height'
            id='height'
            name='height'
            placeholder='Height'
            required
            min={50}
            max={100_000}
          />
        </div>
        <button
          disabled={createNewDesign.isRunning}
          type='submit'
          class='w-full rounded-md bg-off-blue px-4 py-2 text-center font-medium text-white hover:bg-blue-dark'
        >
          Create new design
        </button>
      </Form>
    </div>
  );
});
