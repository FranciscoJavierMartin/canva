import { component$, useComputed$, useContext } from '@builder.io/qwik';
import { CanvaContext } from '@/presentation/contexts/canva/canva';
import InputSlider from './input-slider';

type ToolsProps = {};

export default component$<ToolsProps>(() => {
  const canvaContext = useContext(CanvaContext);
  const isOpen = useComputed$(() => !!canvaContext.currentComponent.value);

  // TODO: Use label instead of span
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
        <div class='mt-4 grid grid-cols-[auto_1fr] justify-start gap-x-3 gap-y-4 px-3'>
          <span class='self-center'>Color</span>
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
          >
            <input
              type='color'
              class='invisible'
              id='color-input'
              value={canvaContext.componentData.color}
              onChange$={(event: Event, element: HTMLInputElement) => {
                canvaContext.componentData.color = element.value;
              }}
            />
          </label>
          {canvaContext.currentComponent.value.name === 'main_frame' && (
            <button
              class='button col-span-2 bg-slate-600 px-3'
              onClick$={() => canvaContext.removeBackground()}
            >
              Remove background
            </button>
          )}
          {canvaContext.currentComponent.value.name !== 'main_frame' && (
            <>
              <span class='self-center text-sm'>Opacity</span>
              <input
                type='range'
                min={0.1}
                step={0.1}
                max={1}
                value={canvaContext.currentComponent.value.opacity}
                class='input-range peer self-center'
                onChange$={(event: Event, element: HTMLInputElement) => {
                  canvaContext.componentData.opacity = parseFloat(
                    element.value,
                  );
                }}
              />
              <label for='z-index-input' class='self-center text-sm'>
                Z index
              </label>
              <input
                id='z-index-input'
                type='number'
                step={1}
                min={0}
                max={9999}
                class='remove-input-number-indicator input-numeric-sidebar'
                value={canvaContext.currentComponent.value.zIndex}
                onChange$={(event: Event, element: HTMLInputElement) => {
                  canvaContext.componentData.zIndex = parseInt(element.value);
                }}
              />
              {canvaContext.currentComponent.value.name === 'image' && (
                <>
                  <label for='radius-input' class='self-center text-sm'>
                    Radius
                  </label>
                  <input
                    id='radius-input'
                    type='number'
                    step={1}
                    min={0}
                    max={100}
                    class='remove-input-number-indicator input-numeric-sidebar'
                    value={canvaContext.currentComponent.value.radius}
                    onChange$={(event: Event, element: HTMLInputElement) => {
                      canvaContext.componentData.radius = parseInt(
                        element.value,
                      );
                    }}
                  />
                </>
              )}
              {canvaContext.currentComponent.value.name === 'text' && (
                <>
                  <label for='padding-input' class='self-center text-sm'>
                    Padding
                  </label>
                  <input
                    id='padding-input'
                    type='number'
                    step={1}
                    min={0}
                    max={100}
                    class='remove-input-number-indicator input-numeric-sidebar'
                    value={canvaContext.currentComponent.value.padding}
                    onChange$={(event: Event, element: HTMLInputElement) => {
                      canvaContext.textComponentData.padding = parseInt(
                        element.value,
                      );
                    }}
                  />
                  <label for='font-size-input' class='self-center text-sm'>
                    Font size
                  </label>
                  <input
                    id='font-size-input'
                    name='font-size-input'
                    type='number'
                    step={1}
                    min={1}
                    max={72}
                    class='remove-input-number-indicator input-numeric-sidebar'
                    value={canvaContext.currentComponent.value.fontSize}
                    onChange$={(event: Event, element: HTMLInputElement) => {
                      canvaContext.textComponentData.fontSize = parseInt(
                        element.value,
                      );
                    }}
                  />
                  <label for='font-weight-input' class='self-center'>
                    Font weight
                  </label>
                  <input
                    id='font-weight-input'
                    name='font-weight-input'
                    type='range'
                    step={100}
                    min={100}
                    max={900}
                    class='remove-input-number-indicator input-range'
                    value={canvaContext.currentComponent.value.fontWeight}
                    onChange$={(event: Event, element: HTMLInputElement) => {
                      canvaContext.textComponentData.fontWeight = parseInt(
                        element.value,
                      );
                    }}
                  />
                  <textarea
                    rows={1}
                    placeholder='Enter text here...'
                    class='no-scrollbar col-span-2 max-h-44 w-full rounded-md border border-[#404040] bg-transparent px-2 py-2 text-sm outline-none'
                    value={canvaContext.currentComponent.value.text}
                    onInput$={(event: Event, element: HTMLTextAreaElement) => {
                      canvaContext.textComponentData.text = element.value;
                      element.style.height = `${element.scrollHeight}px`;
                    }}
                  />
                </>
              )}
            </>
          )}
        </div>
      )}
    </aside>
  );
});
