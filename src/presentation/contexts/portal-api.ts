import { type JSXOutput, type QRL, createContextId } from '@builder.io/qwik';
import type { ContextPair } from '@/interfaces/portal.interface';

// Define public API for opening up Portals
export const PortalAPI = createContextId<
  /**
   * Add JSX to a portal.
   * @param name portal name.
   * @param jsx to add.
   * @param contexts to add to the portal.
   * @returns A function used for closing the portal.
   */
  QRL<
    (name: string, jsx: JSXOutput, contexts?: ContextPair<any>[]) => () => void
  >
>('PortalProviderAPI');
