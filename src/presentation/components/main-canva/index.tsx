import { type JSXOutput, component$ } from '@builder.io/qwik';
import type { ComponentInfo } from '@/interfaces/types/components';
import MainFrame from './main-frame';
import ShapeRect from './shape-rect';

type MainCanvaProps = {
  info: ComponentInfo;
};

export default component$<MainCanvaProps>(({ info }) => {
  let component: JSXOutput;

  switch (info.name) {
    case 'main_frame':
      component = <MainFrame {...info} />;
      break;
    case 'shape':
      switch (info.type) {
        case 'rect':
          component = <ShapeRect {...info} />;
          break;
      }
      break;
    default:
      component = <div />;
  }

  return component;
});
