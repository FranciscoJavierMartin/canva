import { component$, useContext } from '@builder.io/qwik';
import type { MainFrameInfo } from '@/interfaces/components.interface';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

type MainFrameProps = MainFrameInfo;

export default component$<MainFrameProps>(
  ({ width, height, color, zIndex, image, id }) => {
    const canvaContext = useContext(CanvaContext);

    return (
      <div
        class='shadow-md hover:border-2 hover:border-indigo-500'
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: color,
          zIndex,
        }}
        onClick$={() => canvaContext.setCurrentComponentId(id)}
      >
        {image && (
          <img
            class='size-full'
            src={image}
            alt='main canva'
            width={width}
            height={height}
          />
        )}
      </div>
    );
  },
);
