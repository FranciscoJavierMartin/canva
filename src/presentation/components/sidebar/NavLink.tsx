import { component$ } from '@builder.io/qwik';
import { type LinkProps } from '@builder.io/qwik-city';
import NavLink from '@/presentation/ui/NavLink';

export type NavLinkProps = LinkProps & {
  text: string;
};

export default component$<NavLinkProps>(({ text, ...props }) => {
  return (
    <NavLink class='flex' {...props}>
      <span class='font-medium'>{text}</span>
    </NavLink>
  );
});
