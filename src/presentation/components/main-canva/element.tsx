import { CanvaContext } from '@/presentation/contexts/canva/canva';
import { component$, useContext } from '@builder.io/qwik';

export default component$(() => {
  const canvaContext = useContext(CanvaContext);

  return (
    <>
      <div></div>
    </>
  );
});
