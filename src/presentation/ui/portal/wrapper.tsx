import {
  type JSXOutput,
  component$,
  useContextProvider,
} from '@builder.io/qwik';
import type { ContextPair } from '@/interfaces/portal.interface';

// WrapJsxInContext
export default component$<{
  jsx: JSXOutput;
  contexts: Array<ContextPair<any>>;
}>(({ jsx, contexts }) => {
  contexts.forEach(({ id, value }) => {
    // eslint-disable-next-line
    useContextProvider(id, value);
  });
  return (
    <>
      {/* Workaround: https://github.com/QwikDev/qwik/issues/4966 */}
      {/* {jsx} */}
      {[jsx].map((jsx) => jsx)}
    </>
  );
});
