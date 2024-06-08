import { component$ } from '@builder.io/qwik';
import NewDesignForm from '@/presentation/components/forms/new-design-form';
import Carousel from '@/presentation/ui/Carousel';

export default component$(() => {
  return (
    <div>
      <div class='relative flex h-[250px] w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-dark to-purple-dark'>
        <NewDesignForm />
        <div>
          <h2 class='py-6 text-3xl font-semibold text-white'>
            What will you design today
          </h2>
        </div>
      </div>
      <div>
        <h2 class='py-6 text-xl font-semibold text-white'>
          Your recent designs
        </h2>
        <div>
          <Carousel />
        </div>
      </div>
    </div>
  );
});
