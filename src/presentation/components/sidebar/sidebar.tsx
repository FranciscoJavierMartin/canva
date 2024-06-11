import { component$, useSignal, $, type Component } from '@builder.io/qwik';
import SidebarIcons from './sidebar-icons';
import SidebarFold from './sidebar-fold';
import design from './panels/design';
import shapes from './panels/shapes';

export default component$(() => {
  const panel = useSignal<Component | undefined>();

  const selectedOption = useSignal<string | undefined>();
  const selectMenu = $((option: string) => {
    console.log(option);
    selectedOption.value = selectedOption.value === option ? undefined : option;

    switch (selectedOption.value) {
      case 'design':
        panel.value = design;
        break;
      case 'shape':
        panel.value = shapes;
        break;
      default:
        panel.value = undefined;
    }
  });

  return (
    <>
      <SidebarIcons selectOption={selectMenu} />
      <SidebarFold>{panel.value && <panel.value />}</SidebarFold>
    </>
  );
});
