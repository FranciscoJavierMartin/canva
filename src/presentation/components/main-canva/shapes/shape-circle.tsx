import { component$, useContext } from '@builder.io/qwik';
import TransformWrapper from '@/presentation/components/main-canva/shapes/transform-wrapper';
import Trash from '@/presentation/icons/trash';
import { CanvaContext } from '@/presentation/contexts/canva/canva';
import type { ShapeCircleInfo } from '@/interfaces/components.interface';

type ShapeCircleProps = ShapeCircleInfo;

export default component$<ShapeCircleProps>(
  ({ id, width, color, opacity, left, top, zIndex, rotation }) => {
    const canvaContext = useContext(CanvaContext);

    return (
      <div
        id={id}
        class='group absolute hover:border-2 hover:border-indigo-500'
        style={{
          left: `${left}px`,
          top: `${top}px`,
          zIndex,
          transform: rotation ? `rotate(${rotation}deg)` : 'rotate(0deg)',
        }}
        onClick$={() => canvaContext.setCurrentComponentId(id)}
      >
        <div
          class='rounded-full'
          style={{
            width: `${width}px`,
            height: `${width}px`,
            backgroundColor: color,
            opacity,
          }}
        ></div>
        <TransformWrapper id={id} />
        <button
          onClick$={() => canvaContext.removeElement(id)}
          class='absolute right-1 top-1 hidden cursor-pointer rounded-md bg-white p-1 text-red-500 group-hover:block'
        >
          <Trash />
        </button>
      </div>
    );
  },
);
