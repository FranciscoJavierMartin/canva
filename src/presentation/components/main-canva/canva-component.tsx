import { type JSXOutput, component$ } from '@builder.io/qwik';
import type { ComponentInfo } from '@/interfaces/components.interface';
import MainFrame from '@/presentation/components/main-canva/main-frame';
import ShapeRect from '@/presentation/components/main-canva/shapes/shape-rect';
import ShapeCircle from '@/presentation/components/main-canva/shapes/shape-circle';
import ShapeTriangle from '@/presentation/components/main-canva/shapes/shape-triangle';
import TextComponent from '@/presentation/components/main-canva/text-component';

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
    case 'text':
      component = <TextComponent {...info} />;
      break;
    default:
      component = <div />;
  }

  return component;
});
