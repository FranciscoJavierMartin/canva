import { component$, useContext } from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';
import TransformWrapper from '@/presentation/components/main-canva/shapes/transform-wrapper';
import Trash from '@/presentation/icons/trash';
import type { ImageInfo } from '@/interfaces/components.interface';

type ImageComponentProps = ImageInfo;

export default component$<ImageComponentProps>(
  ({
    id,
    image,
    left,
    top,
    zIndex,
    opacity,
    rotation,
    color,
    height,
    width,
    radius,
  }) => {
    const canvaContext = useContext(CanvaContext);

    return (
      <div
        id={id}
        class='group absolute hover:border-2 hover:border-indigo-500'
        style={{
          width: `${width}px`,
          height: `${height}px`,
          left: `${left}px`,
          top: `${top}px`,
          zIndex,
          opacity,
          color,
          transform: rotation ? `rotate(${rotation}deg)` : 'rotate(0deg)',
        }}
        onClick$={() => canvaContext.setCurrentComponentId(id)}
      >
        <TransformWrapper id={id} />
        <img
          src={image}
          alt='Castle'
          height={height}
          width={width}
          style={{ borderRadius: `${radius}px` }}
        />
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
