import { $, component$, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { createId } from '@paralleldrive/cuid2';
import CanvaComponent from '@/presentation/components/main-canva/canva-component';
import type { ComponentInfo } from '@/interfaces/components.interface';

export default component$(() => {
  const ref = useSignal<HTMLDivElement>();
  const location = useLocation();

  const obj: ComponentInfo = {
    name: 'main_frame',
    type: 'rect',
    id: createId(),
    height: +(location.url.searchParams.get('height') ?? 500),
    width: +(location.url.searchParams.get('width') ?? 650),
    zIndex: 1,
    color: '#fff',
    image: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setCurrentComponentId: $((componentId: string) => {}),
  };

  return (
    <div class='center-elements h-screen w-screen'>
      <div ref={ref} class='relative size-auto overflow-auto'>
        <CanvaComponent info={obj} />
      </div>
    </div>
  );
});
