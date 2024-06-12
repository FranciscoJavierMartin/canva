import {
  $,
  Slot,
  component$,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';
import type { ComponentInfo } from '@/interfaces/types/components';
import type { CanvaContextState } from '@/interfaces/types/canva';

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

  useContextProvider<CanvaContextState>(CanvaContext, {
    currentComponent,
    components,
    rotateElement,
    removeElement,
    resizeElement,
    moveElement,
  });

  return (
    <div class='relative flex h-[calc(100vh-64px)]'>
      <Slot />
    </div>
  );
});
