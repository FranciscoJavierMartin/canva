import { $, component$ } from '@builder.io/qwik';
import Navbar from '@/presentation/ui/Navbar';
import Sidebar from '@/presentation/components/sidebars/sidebar';
import Tools from '@/presentation/components/sidebars/tools/tools';
import MainCanva from '@/presentation/components/main-canva/main-canva';
import CanvaProvider from '@/presentation/providers/canva-provider';
import html2canvas from 'html2canvas';

export default component$(() => {
  const download = $(() => {
    const mainDesign = document.getElementById('main_design');

    if (mainDesign) {
      html2canvas(mainDesign, {
        windowWidth: 650,
        windowHeight: 500,
        removeContainer: true,
      }).then((canvas) => {
        canvas.toBlob(function (blob) {
          const link = document.createElement('a');
          link.download = 'image.png';
          link.href = URL.createObjectURL(blob!);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 'image/png');
      });
    }
  });

  return (
    <div class='min-w-screen h-screen bg-black'>
      <Navbar>
        <div class='center-elements gap-2 text-gray-200'>
          <button class='button bg-purple-blue px-3'>Save</button>
          <button onClick$={download} class='button bg-purple-bright px-3'>
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
