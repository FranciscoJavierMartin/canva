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
  }) => {
    const canvaContext = useContext(CanvaContext);

    return (
      <div
        id={id}
        class='group absolute hover:border-2 hover:border-indigo-500'
        style={{
          left: `${left}px`,
          top: `${top}px`,
          zIndex,
          opacity,
          color,
          transform: rotation ? `rotate(${rotation}deg)` : 'rotate(0deg)',
        }}
      >
        <TransformWrapper id={id} />
        <div
          class='overflow-hidden'
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          <img class='size-full' src={image} alt='Castle' />
        </div>
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
