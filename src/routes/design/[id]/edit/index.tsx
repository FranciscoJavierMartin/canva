import { $, component$ } from '@builder.io/qwik';
import Navbar from '@/presentation/ui/Navbar';
import Sidebar from '@/presentation/components/sidebars/sidebar';
import Tools from '@/presentation/components/sidebars/tools/tools';
import MainCanva from '@/presentation/components/main-canva/main-canva';
import CanvaProvider from '@/presentation/providers/canva-provider';
import { toPng } from '@/core/use-cases/html-to-png';

export default component$(() => {
  const downloadImage = $(async () => {
    const mainDesign = document.getElementById('main_frame');

    if (mainDesign) {
      try {
        const dataUrl = await toPng(mainDesign, {
          style: {
            transform: 'scale(1)',
          },
        });

        const link = document.createElement('a');
        link.download = 'image';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.log(error);
      }
    }
    // window.open(
    //   '',
    //   (document.getElementById('main_frame') as HTMLCanvasElement).toDataURL(),
    // );
  });

  return (
    <div class='min-w-screen h-screen bg-black'>
      <Navbar>
        <div class='center-elements gap-2 text-gray-200'>
          <button class='button bg-purple-blue px-3'>Save</button>
          <button onClick$={downloadImage} class='button bg-purple-bright px-3'>
            Download
          </button>
        </div>
      </Navbar>
      <CanvaProvider>
        <Sidebar />
        <MainCanva />
        <Tools />
      </CanvaProvider>
    </div>
  );
});
