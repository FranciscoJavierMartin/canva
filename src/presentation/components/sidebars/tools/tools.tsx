import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const openTools = useSignal<boolean>(true);

  return (
    <aside
      class={[
        'absolute right-0 h-full w-[250px] bg-gray-700 transition-transform duration-300',
        {
          'translate-x-[250px]': !openTools.value,
          'translate-x-0': openTools.value,
        },
      ]}
    >
      <h2 class='text-white'>Tools</h2>
    </aside>
  );
});
