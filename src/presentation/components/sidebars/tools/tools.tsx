import { component$, useComputed$, useContext } from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';

type ToolsProps = {};

export default component$<ToolsProps>(() => {
  const canvaContext = useContext(CanvaContext);
  const isOpen = useComputed$(() => !!canvaContext.currentComponent.value);

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
      {!!canvaContext.currentComponent.value && (
        <div class='flex h-full flex-col items-start justify-start gap-6 px-3'>
          <div class='mt-4 flex items-center justify-start gap-4'>
            <span>Color</span>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              for='color-input'
              class='size-[30px] rounded-md'
              style={{
                backgroundColor:
                  canvaContext.currentComponent.value.color &&
                  canvaContext.currentComponent.value.color !== '#fff'
                    ? canvaContext.currentComponent.value.color
                    : 'gray',
              }}
            ></label>
            <input
              type='color'
              class='invisible'
              id='color-input'
              onChange$={(event: Event, element: HTMLInputElement) => {
                canvaContext.componentData.color = element.value;
              }}
            />
          </div>
          {canvaContext.currentComponent.value?.name === 'main_frame' && (
            <button
              class='button bg-slate-600 px-3'
              onClick$={() => canvaContext.removeBackground()}
            >
              Remove background
            </button>
          )}
        </div>
      )}
    </aside>
  );
});
