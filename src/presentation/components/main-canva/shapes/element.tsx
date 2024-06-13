import { CanvaContext } from '@/presentation/contexts/canva/canva';
import { component$, useContext } from '@builder.io/qwik';

export default component$(() => {
  const canvaContext = useContext(CanvaContext);

  return (
    <>
      <>
        <div
          onMouseDown$={() => canvaContext.resizeElement()}
          class='bg-green-600 absolute -bottom-1 -right-1 z-50 hidden size-2.5 cursor-nwse-resize group-hover:block'
        ></div>
        <div
          onMouseDown$={() => canvaContext.resizeElement()}
          class='bg-green-600 absolute -right-1 -top-1 z-50 hidden size-2.5 cursor-nesw-resize group-hover:block'
        ></div>
        <div
          onMouseDown$={() => canvaContext.resizeElement()}
          class='bg-green-600 absolute -bottom-1 -left-1 z-50 hidden size-2.5 cursor-nesw-resize group-hover:block'
        ></div>
      </>
      <div
        onMouseDown$={() => canvaContext.rotateElement()}
        class='absolute -left-1 -top-1 z-50 hidden size-2.5 cursor-pointer bg-red-600 group-hover:block'
      ></div>
    </>
  );
});
