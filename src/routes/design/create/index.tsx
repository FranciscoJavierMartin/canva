import { component$, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import MainCanva from '@/presentation/components/main-canva/index';
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
    <div class='center-elements h-screen w-screen'>
      <div ref={ref} class='relative size-auto overflow-auto'>
        <MainCanva info={obj} />
      </div>
    </div>
  );
});
