import { type QRL, Slot, component$ } from '@builder.io/qwik';
import ArrowLeft from '@/presentation/icons/arrow-left';

type SidebarFoldProps = {
  isOpen: boolean;
  closePanel: QRL<() => void>;
};

export default component$<SidebarFoldProps>(({ isOpen, closePanel }) => {
  return (
    <aside
      class={[
        'absolute left-[85px] z-20 h-full w-[350px] bg-black-light p-5 transition-transform duration-300',
        {
          '-translate-x-full': !isOpen,
          'translate-x-0': isOpen,
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
    </aside>
  );
});
