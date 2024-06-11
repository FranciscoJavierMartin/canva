import { $, component$, useSignal } from '@builder.io/qwik';
import Navbar from '@/presentation/ui/Navbar';
import Sidebar from '@/presentation/components/sidebar/sidebar';
import MainCanva from '@/presentation/components/main-canva';
import type { ComponentInfo } from '@/interfaces/types/components';

export default component$(() => {
  const currentComponent = useSignal<ComponentInfo | undefined>({
    name: 'main_frame',
    type: 'rect',
    id: Math.floor(Math.random() * 10_000 + 1),
    height: 500,
    width: 650,
    zIndex: 1,
    color: '#fff',
    image: '',
  });
  const components = useSignal<ComponentInfo[]>([currentComponent.value!]);

  const moveElement = $(() => {
    console.log('Move element');
  });

  const resizeElement = $(() => {
    console.log('Resize element');
  });

  const rotateElement = $(() => {
    console.log('Rotate element');
  });

  const removeElement = $(() => {
    console.log('Remove element');
  });

  return (
    <div class='min-w-screen grid-template-areas-edit-page-container grid h-screen grid-cols-[85px_350px_auto_250px] grid-rows-[64px_auto] bg-black'>
      <Navbar>
        <div class='flex items-center justify-center gap-2 text-gray-200'>
          <button class='button bg-purple-blue px-3'>Save</button>
          <button class='button bg-purple-bright px-3'>Download</button>
        </div>
      </Navbar>
      <Sidebar />
      <div class='grid-area-design h-full border border-red-500'>
        <div
          class={[
            'relative flex h-full w-full items-center justify-center',
            {
              'overflow-hidden': !currentComponent.value,
            },
          ]}
        >
          <div
            class={
              'flex min-h-[500px] min-w-[650px] items-center justify-center overflow-hidden'
            }
          >
            <div class='relative size-auto overflow-hidden'>
              {components.value.map((c) => (
                <MainCanva key={c.id} info={c} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div class='grid-area-tools z-10 h-full w-[250px] bg-black-light px-3 py-2 text-gray-300'>
        <div class='flex h-full flex-col items-start justify-start gap-6 px-3'>
          <h1 class='text-white'>Tools</h1>
        </div>
      </div>
    </div>
  );
});
