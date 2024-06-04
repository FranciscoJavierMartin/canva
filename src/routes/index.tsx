import {
  $,
  component$,
  useContext,
  useOnWindow,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import Logo from '@/components/icons/logo';
import { PortalAPI, PortalCloseAPIContextId } from '@/portal-provider';
import { useLocation } from '@builder.io/qwik-city';
import CSS from './styles.css?inline';

export default component$(() => {
  const portal = useContext(PortalAPI);
  const openModal = $(() => portal('modal', <PopupExample name='World' />));

  const location = useLocation();

  useTask$(() => {
    if (location.url.searchParams.get('modal')) {
      openModal();
    }
  });

  return (
    <div class='min-h-screen w-full bg-black'>
      <div class='bg-mid-black shadow-md'>
        <div class='m-auto w-[93%] py-3'>
          <div class='flex items-center justify-between'>
            <div class='h-[30px] w-[80px]'>
              <Logo />
            </div>
            <div class='flex gap-4'>
              <button class='text-white' onClick$={openModal}>
                Open
              </button>
              <button class='w-[80px] rounded-[5px] bg-teal-700 py-2 text-center font-medium text-white transition-all hover:bg-teal-500'>
                Sign In
              </button>
              <button class='w-[80px] rounded-[5px] bg-purple-700 py-2 text-center font-medium text-white transition-all hover:bg-purple-500'>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class='h-full w-full items-center justify-center p-4'>
        <div class='flex h-full flex-col items-center justify-center gap-6 pt-44 text-center'>
          <h2 class='text-5xl font-bold text-light-gray'>
            What you will design today?
          </h2>
          <span class='text-2xl font-medium text-mid-gray'>
            Canva makes it easy to create and share professional designs,
          </span>
          <button class='w-[200px] rounded-[5px] bg-purple-700 py-2 text-center font-medium text-white transition-all hover:bg-purple-500'>
            Sign Up for Free
          </button>
        </div>
      </div>
    </div>
  );
});

export const PopupExample = component$<{ name: string }>(({ name }) => {
  useStylesScoped$(CSS);
  const portalClose = useContext(PortalCloseAPIContextId);

  useOnWindow(
    'keydown',
    $((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        portalClose();
      }
    }),
  );

  return (
    <dialog class='popup-example flex flex-col text-white' id='favDialog'>
      <h1>Modal</h1>
      <p>Hello {name}</p>
      <button autoFocus onClick$={() => portalClose()}>
        X
      </button>
      <button value='cancel' formMethod='dialog'>
        Cancel
      </button>
      <form method='dialog'>
        <button>OK</button>
      </form>
    </dialog>
  );
});
