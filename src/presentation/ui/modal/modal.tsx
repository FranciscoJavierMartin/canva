import { $, component$, useContext, useOnWindow } from '@builder.io/qwik';
import { PortalCloseAPIContextId } from '@/presentation/contexts/portal-close';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  const portalClose = useContext(PortalCloseAPIContextId);

  useOnWindow(
    'keydown',
    $((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        portalClose();
      }
    }),
  );

  return (
    <div class='fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-[#252627ad] transition-all duration-500'>
      <div class='relative m-auto w-[350px] rounded-md bg-[#323335] px-6 py-4'>
        <Link
          href='..'
          class='absolute right-4 top-4 cursor-pointer text-xl text-white'
        ></Link>
        <h1 class='text-white'>Modal</h1>
      </div>
    </div>
  );
});
