import { PortalCloseAPIContextId } from '@/presentation/contexts/portal-close';
import { component$, useContext } from '@builder.io/qwik';

export default component$(() => {
  const closePortal = useContext(PortalCloseAPIContextId);

  return (
    <button class='flex min-w-fit flex-col gap-4 p-4' onClick$={closePortal}>
      <div class='w-72 rounded-xl bg-red-500 p-4 text-white'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugiat
        quam qui, voluptatibus doloremque ea quis eius iure error saepe
        repudiandae facere sit suscipit. Reiciendis mollitia asperiores aut
        neque quis.
      </div>
    </button>
  );
});
