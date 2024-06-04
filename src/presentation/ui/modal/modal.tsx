import {
  $,
  type Component,
  Slot,
  component$,
  useContext,
  useOnWindow,
  useTask$,
} from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { PortalCloseAPIContextId } from '@/presentation/contexts/portal-close';
import XMark from '@/presentation/icons/x-mark';

export default component$(() => {
  const location = useLocation();
  const portalClose = useContext(PortalCloseAPIContextId);
  let CrossComponent: Component;

  useOnWindow(
    'keydown',
    $((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        portalClose();
      }
    }),
  );

  useTask$(({ track }) => {
    track(() => location.url.search);
    console.log('Track', location.url.search);
    if (location.url.searchParams.get('modal')) {
      // openModal();
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
