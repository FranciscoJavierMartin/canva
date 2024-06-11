import { component$ } from '@builder.io/qwik';
import type { IconProps } from '@/interfaces/types/icons';

export default component$<IconProps>(({ styles }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke-width='1.5'
    stroke='currentColor'
    class={['size-6', styles]}
  >
    <path
      stroke-linecap='round'
      stroke-linejoin='round'
      d='M15.75 19.5 8.25 12l7.5-7.5'
    />
  </svg>
));
