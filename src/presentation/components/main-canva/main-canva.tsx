import { component$, useContext } from '@builder.io/qwik';
import CanvaComponent from '@/presentation/components/main-canva/canva-component';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

export default component$(() => {
  const canva = useContext(CanvaContext);

  return (
    <div class='center-elements h-full w-[calc(100vw-85px)]'>
      <main class='relative size-auto min-h-[500px] min-w-[650px] overflow-hidden'>
        {Object.values(canva.components).map((c) => (
          // TODO: Use computed
          <CanvaComponent key={c.id} info={c} />
        ))}
      </main>
    </div>
  );
});
