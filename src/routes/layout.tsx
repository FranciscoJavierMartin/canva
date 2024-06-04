import { component$, Slot } from '@builder.io/qwik';
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city';
import PortalProvider from '@/presentation/providers/portal-provider';
import Portal from '@/presentation/ui/portal/portal';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const head: DocumentHead = {
  title: 'Canva',
  meta: [
    {
      name: 'description',
      content: 'App for make your own drawings',
    },
  ],
};

export default component$(() => {
  return (
    <PortalProvider>
      <Slot />
      <Portal name='modal' />
    </PortalProvider>
  );
});
