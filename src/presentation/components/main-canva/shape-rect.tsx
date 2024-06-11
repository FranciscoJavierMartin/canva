import { component$ } from '@builder.io/qwik';
import type { ShapeRectInfo } from '@/interfaces/types/components';

type ShapeRectProps = ShapeRectInfo;

export default component$<ShapeRectProps>(
  ({ width, height, color, opacity, left, top, zIndex, rotate }) => {
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
          transform: rotate ? `rotate(${rotate}deg)` : 'rotate(0deg)',
        }}
      ></div>
    );
  },
);
