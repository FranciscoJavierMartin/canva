import { Slot, component$ } from '@builder.io/qwik';
import { Link, type LinkProps, useLocation } from '@builder.io/qwik-city';

type NavLinkProps = LinkProps & { activeClass?: string };

export default component$<NavLinkProps>(({ activeClass, ...props }) => {
  const location = useLocation();
  const toPathname = props.href ?? '';
  const locationPathname = location.url.pathname;
  const startSlashPosition =
    toPathname !== '/' && toPathname.startsWith('/')
      ? toPathname.length - 1
      : toPathname.length;
  const endSlashPosition =
    toPathname !== '/' && toPathname.startsWith('/')
      ? toPathname.length - 1
      : toPathname.length;
  const isActive: boolean =
    locationPathname === toPathname ||
    (locationPathname.endsWith(toPathname) &&
      (locationPathname.charAt(endSlashPosition) === '/' ||
        locationPathname.charAt(startSlashPosition) === '/'));

  return (
    <Link
      {...props}
      class={`${props.class || ''} ${isActive ? activeClass : ''}`}
    >
      <Slot />
    </Link>
  );
});
