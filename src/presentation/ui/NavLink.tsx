import { Slot, component$ } from '@builder.io/qwik';
import { Link, type LinkProps, useLocation } from '@builder.io/qwik-city';

type NavLinkProps = LinkProps & { activeClass?: string };

export default component$<NavLinkProps>(({ activeClass, ...props }) => {
  const location = useLocation();
  let toPathname: string = props.href ?? '';
  let locationPathname: string = location.url.pathname;

  if (toPathname.startsWith('/')) {
    toPathname = toPathname.substring(1);
  }

  if (toPathname.endsWith('/')) {
    toPathname = toPathname.substring(0, toPathname.length - 1);
  }

  if (locationPathname.startsWith('/')) {
    locationPathname = locationPathname.substring(1);
  }

  if (locationPathname.endsWith('/')) {
    locationPathname = locationPathname.substring(
      0,
      locationPathname.length - 1,
    );
  }

  const isActive = locationPathname === toPathname;

  return (
    <Link {...props} class={[props.class || '', isActive ? activeClass : '']}>
      <Slot />
    </Link>
  );
});
