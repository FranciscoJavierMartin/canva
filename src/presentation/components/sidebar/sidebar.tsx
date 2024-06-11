import { component$, useSignal, $, type Component } from '@builder.io/qwik';
import type { SidebarPanelType } from '@/interfaces/types/sidebar';
import SidebarIcons from './sidebar-icons';
import SidebarFold from './sidebar-fold';
import design from './panels/design';
import shapes from './panels/shapes';
import upload from './panels/upload';
import text from './panels/text';
import projects from './panels/projects';
import images from './panels/images';
import background from './panels/background';

export default component$(() => {
  const panel = useSignal<Component | undefined>();

  const selectedOption = useSignal<SidebarPanelType | undefined>();
  const selectOption = $((option: SidebarPanelType) => {
    selectedOption.value = selectedOption.value === option ? undefined : option;

    switch (selectedOption.value) {
      case 'design':
        panel.value = design;
        break;
      case 'shape':
        panel.value = shapes;
        break;
      case 'uploadImage':
        panel.value = upload;
        break;
      case 'text':
        panel.value = text;
        break;
      case 'projects':
        panel.value = projects;
        break;
      case 'initImage':
        panel.value = images;
        break;
      case 'background':
        panel.value = background;
        break;
      default:
        panel.value = undefined;
    }
  });

  return (
    <>
      <SidebarIcons selectOption={selectOption} />
      <SidebarFold>{panel.value && <panel.value />}</SidebarFold>
    </>
  );
});
