import { type QRL, Slot, component$ } from '@builder.io/qwik';
import ArrowLeft from '@/presentation/icons/arrow-left';

type SidebarFoldProps = {
  isOpen: boolean;
  closePanel: QRL<() => void>;
};

export default component$<SidebarFoldProps>(({ isOpen, closePanel }) => {
  return (
    <div
      class={[
        'grid-area-sidebar relative z-10 w-[350px] bg-black-light transition-transform',
        {
          '-translate-x-full p-0': !isOpen,
          'px-8 py-5 transition-transform': isOpen,
        },
      ]}
    >
      <button
        onClick$={closePanel}
        class={[
          'absolute -right-2 top-[calc(50%-50px)] flex h-[100px] w-[15px] items-center justify-center rounded-full bg-black-light text-slate-300 hover:text-gray-100',
          {
            hidden: !isOpen,
          },
        ]}
      >
        <ArrowLeft />
      </button>
      <Slot />
    </div>
  );
});
