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
          {canvaContext.currentComponent.value.name === 'main_frame' && (
            <button
              class='button bg-slate-600 px-3'
              onClick$={() => canvaContext.removeBackground()}
            >
              Remove background
            </button>
          )}
          {canvaContext.currentComponent.value.name !== 'main_frame' && (
            <div class='flex flex-col gap-6'>
              <div class='flex items-center justify-start gap-1'>
                <span class='text-md'>Opacity</span>
                <input
                  type='range'
                  min={0.1}
                  step={0.1}
                  max={1}
                  value={canvaContext.currentComponent.value.opacity}
                  class='range'
                  onChange$={(event: Event, element: HTMLInputElement) => {
                    canvaContext.componentData.opacity = parseFloat(
                      element.value,
                    );
                  }}
                />
              </div>
              <div class='flex items-center justify-start gap-1'>
                <span>Z-index</span>
                <input
                  type='number'
                  step={1}
                  class='remove-input-number-indicator w-full rounded-md border border-[#404040] bg-[#1b1a1a] bg-transparent px-2 py-1 text-right outline-none placeholder:text-left'
                  min={0}
                  max={9999}
                  value={canvaContext.currentComponent.value.zIndex}
                  onChange$={(event: Event, element: HTMLInputElement) => {
                    canvaContext.componentData.zIndex = parseInt(element.value);
                  }}
                />
              </div>
              {canvaContext.currentComponent.value.name === 'text' && (
                <>
                  <div class='flex items-center justify-start gap-1'>
                    <span>Padding</span>
                    <input
                      type='number'
                      step={1}
                      class='remove-input-number-indicator w-full rounded-md border border-[#404040] bg-[#1b1a1a] bg-transparent px-2 py-1 text-right outline-none placeholder:text-left'
                      min={0}
                      max={100}
                      value={canvaContext.currentComponent.value.padding}
                      onChange$={(event: Event, element: HTMLInputElement) => {
                        canvaContext.componentData.padding = parseInt(
                          element.value,
                        );
                      }}
                    />
                  </div>
                  <div class='flex items-center justify-start gap-1'>
                    <span>Font size</span>
                    <input
                      type='number'
                      step={1}
                      class='remove-input-number-indicator w-full rounded-md border border-[#404040] bg-[#1b1a1a] bg-transparent px-2 py-1 text-right outline-none placeholder:text-left'
                      min={1}
                      max={72}
                      value={canvaContext.currentComponent.value.fontSize}
                      onChange$={(event: Event, element: HTMLInputElement) => {
                        canvaContext.componentData.fontSize = parseInt(
                          element.value,
                        );
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </aside>
  );
});
