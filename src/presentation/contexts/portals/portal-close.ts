import { type QRL, createContextId } from '@builder.io/qwik';

// Define public API for closing Portals
export const PortalCloseAPIContextId =
  createContextId<QRL<() => void>>('PortalCloseAPI');
