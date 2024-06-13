import { component$, useContext } from '@builder.io/qwik';
import type { ShapeCircleInfo } from '@/interfaces/components.interface';
import Trash from '@/presentation/icons/trash';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

type ShapeCircleProps = ShapeCircleInfo;

export default component$<ShapeCircleProps>(
  ({
    id,
    width,
    color,
    opacity,
    left,
    top,
    zIndex,
    rotation,
    setCurrentComponentId,
  }) => {
    const canva = useContext(CanvaContext);

    return (
      <div
        class='group absolute hover:border-2 hover:border-indigo-500'
        style={{
          left: `${left}px`,
          top: `${top}px`,
          zIndex,
          transform: rotation ? `rotate(${rotation}deg)` : 'rotate(0deg)',
        }}
        onClick$={() => setCurrentComponentId(id)}
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
        <button
          onClick$={() => canva.removeElement(id)}
          class='absolute right-1 top-1 hidden cursor-pointer rounded-md bg-white p-1 text-red-500 group-hover:block'
        >
          <Trash />
        </button>
      </div>
    );
  },
);
