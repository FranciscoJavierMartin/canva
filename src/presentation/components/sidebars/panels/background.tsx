import { CanvaContext } from '@/presentation/contexts/canva/canva';
import { component$, useContext } from '@builder.io/qwik';

export default component$(() => {
  const canvaContext = useContext(CanvaContext);

  return (
    <div class='grid grid-cols-2 gap-2'>
      {[1, 2, 3, 4, 5, 6].map((img) => (
        <div
          key={img}
          class='h-[90px] w-full cursor-pointer overflow-hidden rounded-md'
          onClick$={() =>
            (canvaContext.componentData.image =
              'https://media.cntraveler.com/photos/56e20de2a69cef316dc99c9f/master/pass/neuschwanstein-castle-germany-cr-getty.jpg')
          }
        >
          <img
            src='https://media.cntraveler.com/photos/56e20de2a69cef316dc99c9f/master/pass/neuschwanstein-castle-germany-cr-getty.jpg'
            class='size-full object-fill'
            alt=''
            width={151}
            height={90}
          />
        </div>
      ))}
    </div>
  );
});
