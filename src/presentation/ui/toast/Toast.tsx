import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class='absolute bottom-4 right-4'>
      <div class='flex min-w-fit flex-col gap-4 whitespace-nowrap p-4'>
        <div class='grid w-full grid-flow-row items-center justify-items-center gap-4 rounded-2xl border-0 bg-red-500 p-4 text-center'>
          <p class='text-white'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            fugiat quam qui, voluptatibus doloremque ea quis eius iure error
            saepe repudiandae facere sit suscipit. Reiciendis mollitia
            asperiores aut neque quis.
          </p>
        </div>
      </div>
    </div>
  );
});
