import { type Signal, createContextId } from '@builder.io/qwik';
import type { Portal } from '@/interfaces/portal.interface';

export const PortalsContextId = createContextId<Signal<Portal[]>>('Portals');
