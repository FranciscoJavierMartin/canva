import { component$ } from '@builder.io/qwik';
import Upload from '@/presentation/icons/upload';

export default component$(() => {
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
    </div>
  );
});
