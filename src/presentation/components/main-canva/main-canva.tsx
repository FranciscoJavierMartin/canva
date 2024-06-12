import { component$ } from '@builder.io/qwik';
import CanvaComponent from './canva-component';

export default component$(() => {
  return (
    <div class='center-elements h-full w-[calc(100vw-85px)]'>
      <main class='relative size-auto min-h-[500px] min-w-[650px] overflow-hidden'>
        {components.value.map((c) => (
          <CanvaComponent key={c.id} info={c} />
        ))}
      </main>
    </div>
  );
});
