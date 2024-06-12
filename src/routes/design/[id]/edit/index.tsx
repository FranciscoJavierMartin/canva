import { $, component$, useSignal } from '@builder.io/qwik';
import Navbar from '@/presentation/ui/Navbar';
import Sidebar from '@/presentation/components/sidebars/sidebar';
import MainCanva from '@/presentation/components/main-canva';
import Tools from '@/presentation/components/sidebars/tools/tools';
import type { ComponentInfo } from '@/interfaces/types/components';

export default component$(() => {
  // TODO: Add all inputs signals
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
    <div class='min-w-screen h-screen bg-black'>
      <Navbar>
        <div class='center-elements gap-2 text-gray-200'>
          <button class='button bg-purple-blue px-3'>Save</button>
          <button class='button bg-purple-bright px-3'>Download</button>
        </div>
      </Navbar>
      <div class='relative flex h-[calc(100vh-64px)]'>
        <Sidebar />
        <div class='center-elements h-full w-[calc(100vw-85px)]'>
          <main class='relative size-auto min-h-[500px] min-w-[650px] overflow-hidden'>
            {components.value.map((c) => (
              <MainCanva key={c.id} info={c} />
            ))}
          </main>
        </div>
        <Tools component={currentComponent.value} />
      </div>
    </div>
  );
});
