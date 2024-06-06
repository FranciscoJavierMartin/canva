import type { ContextId, JSXOutput, QRL } from '@builder.io/qwik';

export type ContextPair<T> = { id: ContextId<T>; value: T };

export interface Portal {
  name: string;
  jsx: JSXOutput;
  close: QRL<() => void>;
  contexts: Array<ContextPair<any>>;
}
