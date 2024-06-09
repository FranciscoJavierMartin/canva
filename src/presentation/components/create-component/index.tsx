import { type JSXOutput, component$ } from '@builder.io/qwik';
import MainFrame from './main-frame';
import type { ComponentInfo } from '@/interfaces/types/components';

type CreateComponentProps = {
  info: ComponentInfo;
};

export default component$<CreateComponentProps>(({ info }) => {
  let component: JSXOutput;

  switch (info.name) {
    case 'main_frame':
      component = <MainFrame {...info} />;
      break;
    default:
      component = <div />;
  }

  return component;
});
