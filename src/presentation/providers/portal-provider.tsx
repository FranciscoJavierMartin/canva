import {
  $,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  type JSXOutput,
} from '@builder.io/qwik';
import type { ContextPair, Portal } from '@/interfaces/portal.interface';
import { PortalsContextId } from '@/presentation/contexts/portal';
import { PortalAPI } from '@/presentation/contexts/portal-api';
import { PortalCloseAPIContextId } from '@/presentation/contexts/portal-close';

export default component$(() => {
  const portals = useSignal<Portal[]>([]);
  useContextProvider(PortalsContextId, portals);

  // Provide the public API for the PopupManager for other components.
  useContextProvider(
    PortalAPI,
    $((name: string, jsx: JSXOutput, contexts?: ContextPair<any>[]) => {
      const portal: Portal = {
        name,
        jsx,
        close: null!,
        contexts: [...(contexts || [])],
      };
      portal.close = $(() => {
        // eslint-disable-next-line qwik/valid-lexical-scope
        switch (name) {
          case 'toast':
            // eslint-disable-next-line qwik/valid-lexical-scope
            if (portals.value.length > 1) {
              // eslint-disable-next-line qwik/valid-lexical-scope
              portals.value = portals.value.filter((p) => p !== portal);
            } else {
              // eslint-disable-next-line qwik/valid-lexical-scope
              portals.value = [];
            }
            break;
          default:
            // eslint-disable-next-line qwik/valid-lexical-scope
            portals.value = portals.value.filter((p) => p !== portal);
        }
      });
      portal.contexts.push({
        id: PortalCloseAPIContextId,
        value: portal.close,
      });
      if (name === 'modal') {
        // eslint-disable-next-line qwik/valid-lexical-scope
        portals.value = [portal];
      } else {
        // eslint-disable-next-line qwik/valid-lexical-scope
        portals.value = [...portals.value, portal];
      }
      return portal.close;
    }),
  );

  return <Slot />;
});
