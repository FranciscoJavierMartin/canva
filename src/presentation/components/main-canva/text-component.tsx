import { component$, useContext } from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';
import type { TextInfo } from '@/interfaces/components.interface';
import Trash from '@/presentation/icons/trash';

type TextComponentProps = TextInfo;

export default component$<TextComponentProps>(
  ({
    id,
    text,
    left,
    top,
    zIndex,
    rotation,
    padding,
    color,
    opacity,
    fontSize,
    fontWeight,
  }) => {
    const canvaContext = useContext(CanvaContext);

    return (
      <div
        id={id}
        onClick$={() => canvaContext.setCurrentComponentId(id)}
        class='group absolute hover:border-2 hover:border-indigo-500'
        style={{
          left: `${left}px`,
          top: `${top}px`,
          zIndex,
          transform: rotation ? `rotate(${rotation}deg)` : 'rotate(0deg)',
          padding: `${padding}px`,
          color,
          opacity,
        }}
      >
        <h2 class='size-full' style={{ fontSize: `${fontSize}px`, fontWeight }}>
          {text}
        </h2>
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
