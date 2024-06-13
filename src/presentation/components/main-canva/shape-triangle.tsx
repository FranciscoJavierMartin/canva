import { component$, useContext } from '@builder.io/qwik';
import type { ShapeTriangleInfo } from '@/interfaces/components.interface';
import Trash from '@/presentation/icons/trash';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

type ShapeTriangleProps = ShapeTriangleInfo;

export default component$<ShapeTriangleProps>(
  ({
    id,
    width,
    height,
    color,
    opacity,
    left,
    top,
    zIndex,
    rotation,
    setCurrentComponent,
    image,
    ...props
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
        onClick$={() =>
          setCurrentComponent({
            id,
            width,
            height,
            color,
            zIndex,
            image,
            setCurrentComponent,
            left,
            top,
            opacity,
            rotation,
            // eslint-disable-next-line qwik/valid-lexical-scope
            ...props,
          })
        }
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
