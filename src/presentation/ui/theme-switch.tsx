import { component$ } from '@builder.io/qwik';

export const ThemeSwitch = component$(() => {
  return (
    <div class='flex items-center gap-3'>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label class='relative inline-block h-8 w-[52px] cursor-pointer rounded-[100px] bg-blue-500'>
        <input
          type='checkbox'
          id='hide-checkbox'
          class='peer hidden'
          onClick$={() => {
            const theme = document.documentElement.className;

            if (theme === 'light') {
              document.documentElement.className = 'dark';
              localStorage.setItem('theme', 'dark');
            } else {
              document.documentElement.className = 'light';
              localStorage.setItem('theme', 'light');
            }
          }}
        />
        <span class='relative h-6 w-12 cursor-pointer rounded-3xl bg-gray-400 transition-all before:absolute before:bottom-0 before:left-1 before:top-4 before:m-auto before:size-6 before:rounded-[50%] before:bg-white before:bg-cover before:transition-all peer-checked:bg-[#2196F3] peer-checked:before:left-6' />
      </label>
    </div>
  );
});
