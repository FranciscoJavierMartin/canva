import { type Component, component$ } from '@builder.io/qwik';
import FolderIcon from '@/presentation/icons/folder';
import ImageIcon from '@/presentation/icons/image';
import LayoutIcon from '@/presentation/icons/layout';
import PencilIcon from '@/presentation/icons/pencil';
import ShapesIcon from '@/presentation/icons/shapes';
import TransparencyIcon from '@/presentation/icons/transparency';
import UploadIcon from '@/presentation/icons/upload';
import type { IconProps } from '@/interfaces/types/icons';

const items: {
  title: string;
  //TODO: Type better 'type' and 'name'
  type: string;
  name: string;
  Icon: Component<IconProps>;
}[] = [
  {
    title: 'Design',
    type: 'design',
    name: 'design',
    Icon: LayoutIcon,
  },
  {
    title: 'Shapes',
    type: 'shape',
    name: 'shape',
    Icon: ShapesIcon,
  },
  {
    title: 'Upload',
    type: 'image',
    name: 'uploadImage',
    Icon: UploadIcon,
  },
  {
    title: 'Text',
    type: 'text',
    name: 'text',
    Icon: PencilIcon,
  },
  {
    title: 'Project',
    type: 'project',
    name: 'projects',
    Icon: FolderIcon,
  },
  {
    title: 'Images',
    type: 'initImage',
    name: 'images',
    Icon: ImageIcon,
  },
  {
    title: 'Background',
    type: 'background',
    name: 'background',
    Icon: TransparencyIcon,
  },
];

export default component$(() => {
  return (
    <div class='grid-area-icons z-20 flex h-full w-[85px] flex-col overflow-y-auto bg-black text-gray-400'>
      {items.map(({ title, Icon }) => (
        <button
          key={title}
          class={[
            'flex h-[80px] flex-col items-center justify-center gap-1 hover:text-gray-100',
          ]}
        >
          <Icon styles='size-6' />
          <span class='text-xs font-medium'>{title}</span>
        </button>
      ))}
    </div>
  );
});
