import { type JSXOutput, component$ } from '@builder.io/qwik';
import type { ComponentInfo } from '@/interfaces/components.interface';
import MainFrame from './main-frame';
import ShapeRect from './shape-rect';
import ShapeCircle from './shape-circle';
import ShapeTriangle from './shape-triangle';

type CanvaComponentProps = {
  info: ComponentInfo;
};

export default component$<CanvaComponentProps>(({ info }) => {
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
        case 'circle':
          component = <ShapeCircle {...info} />;
          break;
        case 'triangle':
          component = <ShapeTriangle {...info} />;
          break;
      }
      break;
    default:
      component = <div />;
  }

  return component;
});
