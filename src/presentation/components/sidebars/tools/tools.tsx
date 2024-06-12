import { component$, useComputed$, useContext } from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

type ToolsProps = {};

export default component$<ToolsProps>(() => {
  const canva = useContext(CanvaContext);
  const isOpen = useComputed$(() => !!canva.currentComponent.value);

  return (
    <aside
      class={[
        'absolute right-0 z-10 h-full w-[250px] bg-black-light text-gray-300 transition-transform duration-300',
        {
          'translate-x-full': !isOpen.value,
          'translate-x-0': !!isOpen.value,
        },
      ]}
    >
      {!!canva.currentComponent.value && (
        <div class='flex h-full flex-col items-start justify-start gap-6 px-3'>
          <div class='mt-4 flex items-center justify-start gap-4'>
            <span>Color</span>
            <label
              for='color-input'
              class='size-[30px] rounded-md'
              style={{
                backgroundColor:
                  canva.currentComponent.value.color &&
                  canva.currentComponent.value.color !== '#fff'
                    ? canva.currentComponent.value.color
                    : 'gray',
              }}
            ></label>
            <input
              type='color'
              class='invisible'
              id='color-input'
              onChange$={(event: Event, element: HTMLInputElement) => {
                canva.componentData.color = element.value;
              }}
            />
          </div>
        </div>
      )}
    </aside>
  );
});
