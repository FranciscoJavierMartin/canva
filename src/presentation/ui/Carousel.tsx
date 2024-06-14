import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import TrashWrapper from './wrapper/trash-wrapper';

export default component$(() => {
  return (
    <div class='no-scrollbar inline-flex snap-mandatory overflow-x-scroll scroll-smooth'>
      <div class='box-content flex flex-none snap-start'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <TrashWrapper key={d}>
            <Link href='/' class='block size-full rounded-md bg-slate-100 p-2'>
              <img
                src='https://media.cntraveler.com/photos/56e20de2a69cef316dc99c9f/master/pass/neuschwanstein-castle-germany-cr-getty.jpg'
                class='size-full overflow-hidden rounded-md'
                alt='Castle'
                width={205}
                height={154}
              />
            </Link>
          </TrashWrapper>
        ))}
      </div>
    </div>
  );
});
