import Sidebar from '@/presentation/components/sidebar/sidebar';
import Navbar from '@/presentation/ui/Navbar';
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const openTools = useSignal<boolean>(false);

  return (
    <div class='min-w-screen h-screen bg-black'>
      <Navbar>
        <div class='flex items-center justify-center gap-2 text-gray-200'>
          <button class='button bg-purple-blue px-3'>Save</button>
          <button class='button bg-purple-bright px-3'>Download</button>
        </div>
      </Navbar>
      <div class='relative flex h-[calc(100vh-64px)]'>
        <Sidebar />
        <div class='w-[calc(100vw-85px)] bg-blue-400'>
          <main class='flex h-full flex-col items-center justify-center'>
            <h1 class='text-purple-600'>Hello world</h1>
            <button
              onClick$={() => (openTools.value = !openTools.value)}
              class='text-white'
            >
              Open tools
            </button>
          </main>
        </div>
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
      </div>
    </div>
  );
});
