import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './presentation/components/router-head/router-head';

import './global.css';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet='utf-8' />
        <link rel='manifest' href='/manifest.json' />
        <RouterHead />
      </head>
      <body lang='en'>
        <RouterOutlet />
        <ServiceWorkerRegister />
        <script
          dangerouslySetInnerHTML={`
        (function() {
          function setTheme(theme) {
            document.documentElement.className = theme;
            localStorage.setItem('theme', theme);
          }
          var theme = localStorage.getItem('theme');
          console.log(theme);
          if (theme) {
            setTheme(theme);
          } else {
            setTheme('light');
          }
        })();
        window.addEventListener('load', function() {
          var themeSwitch = document.getElementById('hide-checkbox');
          themeSwitch.checked = localStorage.getItem('theme') === 'light'? true: false;
        }
        );
      `}
        ></script>
      </body>
    </QwikCityProvider>
  );
});
