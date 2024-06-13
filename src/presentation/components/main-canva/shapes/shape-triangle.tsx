import { component$, useContext } from '@builder.io/qwik';
import TransformWrapper from '@/presentation/components/main-canva/shapes/transform-wrapper';
import Trash from '@/presentation/icons/trash';
import { CanvaContext } from '@/presentation/contexts/canva/canva';
import type { ShapeTriangleInfo } from '@/interfaces/components.interface';

type ShapeTriangleProps = ShapeTriangleInfo;

export default component$<ShapeTriangleProps>(
  ({ id, width, height, color, opacity, left, top, zIndex, rotation }) => {
    const canvaContext = useContext(CanvaContext);

    return (
      <div
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
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: color,
            opacity,
            clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
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
