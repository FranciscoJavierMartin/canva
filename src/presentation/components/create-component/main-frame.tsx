import { component$ } from '@builder.io/qwik';
import type { MainFrameInfo } from '@/interfaces/types/components';

type MainFrameProps = MainFrameInfo;

export default component$<MainFrameProps>(
  ({ width, height, color, zIndex, image }) => {
    return (
      <div
        class='shadow-md hover:border-2 hover:border-indigo-500'
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: color,
          zIndex,
        }}
      >
        {/* eslint-disable-next-line qwik/jsx-img */}
        {image && <img class='size-full' src={image} alt='image' />}
      </div>
    );
  },
);