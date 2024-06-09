import { type JSXOutput, component$, useSignal } from '@builder.io/qwik';
import SidebarIcons from './sidebar-icons';
import SidebarFold from './sidebar-fold';
import TemplateDesign from './template-design';

export default component$(() => {
  let panel: JSXOutput = <div />;

  const state = useSignal('design');

  switch (state.value) {
    case 'design':
      panel = <TemplateDesign />;
      break;
  }

  return (
    <>
      <SidebarIcons />
      <SidebarFold>{panel}</SidebarFold>
    </>
  );
});
