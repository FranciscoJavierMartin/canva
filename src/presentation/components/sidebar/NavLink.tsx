import { component$, type Component } from '@builder.io/qwik';
import { type LinkProps } from '@builder.io/qwik-city';
import NavLink from '@/presentation/ui/NavLink';

export type NavLinkProps = LinkProps & {
  text: string;
  Icon: Component;
};

export default component$<NavLinkProps>(({ text, Icon, ...props }) => {
  return (
    <NavLink
      class='flex items-center justify-start gap-3 rounded-md px-3 py-2 text-lighter-gray'
      activeClass='bg-[#ffffff26]'
      {...props}
    >
      <Icon />
      <span class='font-medium'>{text}</span>
    </NavLink>
  );
});
