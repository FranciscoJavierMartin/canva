import { component$, useContext } from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';
import Upload from '@/presentation/icons/upload';

export default component$(() => {
  const canvaContext = useContext(CanvaContext);

  return (
    <div>
      <div class='center-elements mb-3 w-full rounded-md bg-purple-500 text-white'>
        <label
          for='image'
          class='flex w-full cursor-pointer justify-center gap-2 p-2'
        >
          <Upload />
          Upload image
          <input type='file' id='image' class='hidden' />
        </label>
      </div>
      <div class='grid grid-cols-2 gap-2'>
        {[
          ...Array(7)
            .fill(1)
            .map((img, i) => (
              <button
                key={i}
                class='h-[90px] w-full overflow-hidden rounded-md'
                onClick$={() =>
                  canvaContext.addImage(
                    'https://media.cntraveler.com/photos/56e20de2a69cef316dc99c9f/master/pass/neuschwanstein-castle-germany-cr-getty.jpg',
                  )
                }
              >
                <img
                  class='size-full'
                  src='https://media.cntraveler.com/photos/56e20de2a69cef316dc99c9f/master/pass/neuschwanstein-castle-germany-cr-getty.jpg'
                  alt='Castle'
                  width={151}
                  height={90}
                />
              </button>
            )),
        ]}
      </div>
    </div>
  );
});
