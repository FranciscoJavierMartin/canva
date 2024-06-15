import { createContextId } from '@builder.io/qwik';
import type { CanvaContextState } from '@/interfaces/canva.interface';

export const CanvaContext = createContextId<CanvaContextState>('canva-context');
