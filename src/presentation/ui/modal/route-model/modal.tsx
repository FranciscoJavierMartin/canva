import {
  $,
  Slot,
  component$,
  useContext,
  useOnWindow,
  useTask$,
} from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { PortalCloseAPIContextId } from '@/presentation/contexts/portals/portal-close';
import XMark from '@/presentation/icons/x-mark';

export default component$(() => {
  const location = useLocation();
  const closePortal = useContext(PortalCloseAPIContextId);

  useOnWindow(
    'keydown',
    $((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePortal();
      }
    }),
  );

  useTask$(({ track }) => {
    track(() => location.url.searchParams.get('modal'));

    if (!location.url.searchParams.get('modal')) {
      closePortal();
    }
  });

  return (
    <div class='fixed left-0 top-0 z-40 grid h-screen w-screen place-content-center bg-[#252627ad]'>
      <div class='relative z-50 m-auto w-[350px] rounded-md bg-[#323335] px-6 py-4'>
        {
          <Link
            href='..'
            class='absolute right-4 top-4 cursor-pointer text-xl text-white'
          >
            <XMark />
          </Link>
        }
        <Slot />
      </div>
    </div>
  );
});
