/* eslint-disable qwik/valid-lexical-scope */
import {
  component$,
  useSignal,
  $,
  type Component,
  useVisibleTask$,
  useComputed$,
} from '@builder.io/qwik';
import type { SidebarPanelType } from '@/interfaces/types/sidebar';
import SidebarIcons from './sidebar-icons';
import SidebarFold from './sidebar-fold';
import design from './panels/design';
import shapes from './panels/shapes';
import text from './panels/text';
import projects from './panels/projects';
import images from './panels/images';
import background from './panels/background';

export default component$(() => {
  const panel = useSignal<Component | undefined>();
  const selectedOption = useSignal<SidebarPanelType | undefined>();

  const selectOption = $((option: SidebarPanelType): void => {
    selectedOption.value = selectedOption.value === option ? undefined : option;
  });

  const closePanel = $((): void => {
    selectedOption.value = undefined;
  });

  const isOpen = useComputed$<boolean>(() => !!selectedOption.value);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => [selectedOption.value]);

    switch (selectedOption.value) {
      case 'design':
        panel.value = design;
        break;
      case 'shape':
        panel.value = shapes;
        break;

      case 'text':
        panel.value = text;
        break;
      case 'images':
        panel.value = images;
        break;
      case 'background':
        panel.value = background;
        break;
      case 'projects':
        panel.value = projects;
        break;
      default:
        panel.value = undefined;
    }
  });

  return (
    <>
      <SidebarIcons
        selectOption={selectOption}
        selectedOption={selectedOption}
      />
      <SidebarFold isOpen={isOpen} closePanel={closePanel}>
        {panel.value && <panel.value />}
      </SidebarFold>
    </>
  );
});
