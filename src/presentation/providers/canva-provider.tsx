import { Slot, component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class='relative flex h-[calc(100vh-64px)]'>
      <Slot />
    </div>
  );
});
