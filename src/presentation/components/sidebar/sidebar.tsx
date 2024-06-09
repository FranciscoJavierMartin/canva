import { component$ } from '@builder.io/qwik';
import SidebarIcons from './sidebar-icons';
import SidebarFold from './sidebar-fold';

export default component$(() => {
  return (
    <>
      <SidebarIcons />
      <SidebarFold />
    </>
  );
});
