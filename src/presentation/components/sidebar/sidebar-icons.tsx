import { component$, $ } from '@builder.io/qwik';
import type { Component, QRL, Signal } from '@builder.io/qwik';
import FolderIcon from '@/presentation/icons/folder';
import ImageIcon from '@/presentation/icons/image';
import LayoutIcon from '@/presentation/icons/layout';
import PencilIcon from '@/presentation/icons/pencil';
import ShapesIcon from '@/presentation/icons/shapes';
import TransparencyIcon from '@/presentation/icons/transparency';
import UploadIcon from '@/presentation/icons/upload';
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
    title: 'Upload',
    type: 'uploadImage',
    Icon: UploadIcon,
  },
  {
    title: 'Text',
    type: 'text',
    Icon: PencilIcon,
  },
  {
    title: 'Project',
    type: 'projects',
    Icon: FolderIcon,
  },
  {
    title: 'Images',
    type: 'initImage',
    Icon: ImageIcon,
  },
  {
    title: 'Background',
    type: 'background',
    Icon: TransparencyIcon,
  },
];

export default component$<{
  selectedOption: Signal<SidebarPanelType | undefined>;
  selectOption: QRL<(option: SidebarPanelType) => void>;
}>(({ selectOption, selectedOption }) => {
  return (
    <aside class='z-30 flex h-full w-[85px] flex-col overflow-y-auto bg-black text-gray-400'>
      {items.map(({ title, Icon, type }) => (
        <button
          key={title}
          class={[
            'flex h-[80px] flex-col items-center justify-center gap-1 hover:text-gray-100',
            { 'bg-black-light text-gray-200': type === selectedOption.value },
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
