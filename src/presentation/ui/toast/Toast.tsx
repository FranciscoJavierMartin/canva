import { PortalCloseAPIContextId } from '@/presentation/contexts/portal-close';
import { Slot, component$, useContext } from '@builder.io/qwik';

export default component$<{ text?: string }>(({ text }) => {
  const closePortal = useContext(PortalCloseAPIContextId);

  return (
    <button class='flex min-w-fit flex-col gap-4 p-4' onClick$={closePortal}>
      <div class='w-72 rounded-xl bg-red-500 p-4 text-white'>
        {text ? text : <Slot />}
      </div>
    </button>
  );
});
