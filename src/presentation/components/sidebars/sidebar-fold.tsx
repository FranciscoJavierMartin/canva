import type { Signal } from '@builder.io/qwik';
import { type QRL, Slot, component$, useSignal, $ } from '@builder.io/qwik';
import ArrowLeft from '@/presentation/icons/arrow-left';
import { useClickOutside } from '@/presentation/hooks/use-click-outside';

type SidebarFoldProps = {
  isOpen: Readonly<Signal<boolean>>;
  closePanel: QRL<() => void>;
};

export default component$<SidebarFoldProps>(({ isOpen, closePanel }) => {
  const ref = useSignal<HTMLDivElement>();

  useClickOutside(
    ref,
    $(() => {
      closePanel();
    }),
    { avoidClick: isOpen },
  );

  return (
    <aside
      ref={ref}
      class={[
        'absolute left-[85px] z-20 h-full w-[350px] bg-slate-100 p-5 transition-transform duration-300 dark:bg-black-light',
        {
          '-translate-x-full': !isOpen.value,
          'translate-x-0': isOpen.value,
        },
      ]}
    >
      <button
        onClick$={closePanel}
        class={[
          'center-elements absolute -right-2 top-[calc(50%-50px)] h-[100px] w-[15px] rounded-full bg-slate-100 dark:bg-black-light dark:text-slate-300 dark:hover:text-gray-100',
          {
            '!hidden': !isOpen.value,
          },
        ]}
      >
        <ArrowLeft />
      </button>
      <Slot />
    </aside>
  );
});
