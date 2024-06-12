import { component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import CanvaComponent from '@/presentation/components/main-canva/canva-component';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

export default component$(() => {
  const canva = useContext(CanvaContext);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => [canva.components]);

    console.log('Hello');
  });

  return (
    <div class='center-elements h-full w-[calc(100vw-85px)]'>
      <main class='relative size-auto min-h-[500px] min-w-[650px] overflow-hidden'>
        {canva.components.value.map((c) => (
          <CanvaComponent key={c.id} info={c} />
        ))}
      </main>
    </div>
  );
});
