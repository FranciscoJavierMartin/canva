import { component$ } from '@builder.io/qwik';
import type { ShapeRectInfo } from '@/interfaces/components.interface';

type ShapeRectProps = ShapeRectInfo;

export default component$<ShapeRectProps>(
  ({
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
    return (
      <div
        class='group absolute hover:border-2 hover:border-indigo-500'
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: color,
          opacity,
          left: `${left}px`,
          top: `${top}px`,
          zIndex,
          transform: rotation ? `rotate(${rotation}deg)` : 'rotate(0deg)',
        }}
        onClick$={() =>
          setCurrentComponent({
            width,
            height,
            color,
            zIndex,
            image,
            setCurrentComponent,
            // eslint-disable-next-line qwik/valid-lexical-scope
            ...props,
          })
        }
      ></div>
    );
  },
);
