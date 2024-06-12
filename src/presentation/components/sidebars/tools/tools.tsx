import { component$ } from '@builder.io/qwik';
import type { ComponentInfo } from '@/interfaces/types/components';

type ToolsProps = {
  component: ComponentInfo | undefined;
};

export default component$<ToolsProps>(({ component }) => {
  return (
    <aside
      class={[
        'absolute right-0 h-full w-[250px] bg-black-light text-gray-300 transition-transform duration-300',
        {
          'translate-x-full': !component,
          'translate-x-0': !!component,
        },
      ]}
    >
      {component && (
        <div class='flex h-full flex-col items-start justify-start gap-6 px-3'>
          <div class='mt-4 flex items-center justify-start gap-4'>
            <span>Color:</span>
            <label
              for='color-input'
              class='size-[30px] rounded-md'
              style={{
                backgroundColor:
                  component.color && component.color !== '#fff'
                    ? component.color
                    : 'gray',
              }}
            ></label>
            <input type='color' class='invisible' id='color-input' />
          </div>
        </div>
      )}
    </aside>
  );
});
