import { component$, $ } from '@builder.io/qwik';
import type { Component, QRL, Signal } from '@builder.io/qwik';
import FolderIcon from '@/presentation/icons/folder';
import ImageIcon from '@/presentation/icons/image';
import LayoutIcon from '@/presentation/icons/layout';
import PencilIcon from '@/presentation/icons/pencil';
import ShapesIcon from '@/presentation/icons/shapes';
import TransparencyIcon from '@/presentation/icons/transparency';
import type { IconProps } from '@/interfaces/types/icons';
import type { SidebarPanelType } from '@/interfaces/types/sidebar';

const items: {
  title: string;
  type: SidebarPanelType;
  Icon: Component<IconProps>;
}[] = [
  {
    title: 'Design',
    type: 'design',
    Icon: LayoutIcon,
  },
  {
    title: 'Shapes',
    type: 'shape',
    Icon: ShapesIcon,
  },
  {
    title: 'Text',
    type: 'text',
    Icon: PencilIcon,
  },
  {
    title: 'Images',
    type: 'images',
    Icon: ImageIcon,
  },
  {
    title: 'Background',
    type: 'background',
    Icon: TransparencyIcon,
  },
  {
    title: 'Project',
    type: 'projects',
    Icon: FolderIcon,
  },
];

export default component$<{
  selectedOption: Signal<SidebarPanelType | undefined>;
  selectOption: QRL<(option: SidebarPanelType) => void>;
}>(({ selectOption, selectedOption }) => {
  return (
    <aside class='z-30 flex h-full w-[85px] flex-col overflow-y-auto bg-white shadow-md dark:bg-black dark:text-gray-400'>
      {items.map(({ title, Icon, type }) => (
        <button
          key={title}
          class={[
            'center-elements h-[80px] flex-col gap-1 hover:text-gray-600 dark:hover:text-gray-100',
            {
              'bg-slate-100 dark:bg-black-light dark:text-gray-200':
                type === selectedOption.value,
            },
          ]}
          onClick$={$(() => selectOption(type))}
        >
          <Icon styles='size-6' />
          <span class='text-xs font-medium'>{title}</span>
        </button>
      ))}
    </aside>
  );
});
