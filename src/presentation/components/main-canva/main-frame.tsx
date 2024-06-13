import { component$ } from '@builder.io/qwik';
import type { MainFrameInfo } from '@/interfaces/components.interface';

type MainFrameProps = MainFrameInfo;

export default component$<MainFrameProps>(
  ({ width, height, color, zIndex, image, setCurrentComponentId, id }) => {
    return (
      <div
        class='shadow-md hover:border-2 hover:border-indigo-500'
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: color,
          zIndex,
        }}
        onClick$={() => setCurrentComponentId(id)}
      >
        {image && (
          <img
            class='size-full'
            src={image}
            alt='image'
            width={width}
            height={height}
          />
        )}
      </div>
    );
  },
);
