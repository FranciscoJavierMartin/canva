import { component$, useContext } from '@builder.io/qwik';
import CanvaComponent from '@/presentation/components/main-canva/canva-component';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

export default component$(() => {
  const canvaContext = useContext(CanvaContext);

  return (
    <div class='center-elements h-full w-[calc(100vw-85px)]'>
      <main id='main_frame' class='relative size-auto min-h-[500px] min-w-[650px] overflow-hidden'>
        {Object.values(canvaContext.components).map((c) => (
          <CanvaComponent key={c.id} info={c} />
        ))}
      </main>
    </div>
  );
});
