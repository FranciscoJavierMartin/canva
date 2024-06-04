import { component$, useContext } from '@builder.io/qwik';
import { PortalsContextId } from '@/presentation/contexts/portal';
import { WrapJsxInContext } from '@/presentation/ui/portal/wrapper';

/**
 * IMPORTANT: In order for the <Portal> to correctly render in SSR, it needs
 * to be rendered AFTER the call to open portal. (Setting content to portal
 * AFTER the portal is rendered can't be done in SSR, because it is not possible
 * to return back to the <Portal/> after it has been streamed to the client.)
 */
export const Portal = component$<{ name: string }>(({ name }) => {
  const portals = useContext(PortalsContextId);
  // useStylesScoped$(CSS);
  const myPortals = portals.value.filter((portal) => portal.name === name);
  return (
    <>
      {myPortals.map((portal, key) => (
        <div key={key} data-portal={name}>
          <WrapJsxInContext jsx={portal.jsx} contexts={portal.contexts} />
        </div>
      ))}
    </>
  );
});
