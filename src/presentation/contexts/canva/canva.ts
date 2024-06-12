import { createContextId } from '@builder.io/qwik';
import type { CanvaContextState } from '@/interfaces/types/canva';

export const CanvaContext = createContextId<CanvaContextState>('canva-context');
