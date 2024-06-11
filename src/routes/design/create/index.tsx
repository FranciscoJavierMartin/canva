import { component$, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import CreateComponent from '@/presentation/components/create-component/index';
import type { ComponentInfo } from '@/interfaces/types/components';

export default component$(() => {
  const ref = useSignal<HTMLDivElement>();
  const location = useLocation();

  const obj: ComponentInfo = {
    name: 'main_frame',
    type: 'rect',
    id: Math.floor(Math.random() * 100 + 1),
    height: +(location.url.searchParams.get('height') ?? 500),
    width: +(location.url.searchParams.get('width') ?? 650),
    zIndex: 1,
    color: 'green',
    image: '',
  };

  return (
    <div class='flex h-screen w-screen items-center justify-center'>
      <div ref={ref} class='relative size-auto overflow-auto'>
        <CreateComponent info={obj} />
      </div>
    </div>
  );
});
