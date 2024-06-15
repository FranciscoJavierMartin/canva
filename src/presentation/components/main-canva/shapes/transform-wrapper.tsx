import { CanvaContext } from '@/presentation/contexts/canva/canva';
import { component$, useContext } from '@builder.io/qwik';

type TransformWrapperProps = {
  id: string;
};

export default component$<TransformWrapperProps>(({ id }) => {
  const canvaContext = useContext(CanvaContext);

  return (
    <>
      <>
        <div
          onMouseDown$={() => canvaContext.resizeElement(id)}
          class='absolute -bottom-1 -right-1 z-50 hidden size-2.5 cursor-nwse-resize bg-green-600 group-hover:block'
        ></div>
        <div
          onMouseDown$={() => canvaContext.resizeElement(id)}
          class='absolute -right-1 -top-1 z-50 hidden size-2.5 cursor-nesw-resize bg-green-600 group-hover:block'
        ></div>
        <div
          onMouseDown$={() => canvaContext.resizeElement(id)}
          class='absolute -bottom-1 -left-1 z-50 hidden size-2.5 cursor-nesw-resize bg-green-600 group-hover:block'
        ></div>
      </>
      <div
        onMouseDown$={() => canvaContext.rotateElement(id)}
        class='absolute -left-1 -top-1 z-50 hidden size-2.5 cursor-pointer bg-red-600 group-hover:block'
      ></div>
      <div
        onMouseDown$={() => canvaContext.moveElement(id)}
        class='absolute -top-1 left-1/2 z-50 hidden size-2.5 -translate-x-1/2 cursor-ns-resize bg-blue-600 group-hover:block'
      ></div>
      <div
        onMouseDown$={() => canvaContext.moveElement(id)}
        class='absolute left-1 top-1/2 z-50 hidden size-2.5 -translate-x-2 -translate-y-2 cursor-ew-resize bg-blue-600 group-hover:block'
      ></div>
      <div
        onMouseDown$={() => canvaContext.moveElement(id)}
        class='absolute right-1 top-1/2 z-50 hidden size-2.5 -translate-y-2 translate-x-2 cursor-ew-resize bg-blue-600 group-hover:block'
      ></div>
      <div
        onMouseDown$={() => canvaContext.moveElement(id)}
        class='absolute -bottom-1 left-1/2 z-50 hidden size-2.5 -translate-x-1/2 cursor-ns-resize bg-blue-600 group-hover:block'
      ></div>
    </>
  );
});
