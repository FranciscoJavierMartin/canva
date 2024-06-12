import { component$ } from '@builder.io/qwik';

type ToolsProps = {
  isOpen: boolean;
};

export default component$<ToolsProps>(({ isOpen }) => {
  return (
    <aside
      class={[
        'absolute right-0 h-full w-[250px] bg-gray-700 transition-transform duration-300',
        {
          'translate-x-full': !isOpen,
          'translate-x-0': isOpen,
        },
      ]}
    >
      <h2 class='text-white'>Tools</h2>
    </aside>
  );
});
