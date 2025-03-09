import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Lara from '@primeng/themes/lara';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Lara, options: { darkModeSelector: '.app-dark' } } }),
        provideTransloco({
        config: {
          availableLangs: ['it', 'en'],
          defaultLang: 'it',
          fallbackLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })
    ]
};
