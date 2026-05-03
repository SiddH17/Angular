import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestInterceptor } from './request-interceptor';
import { InitService } from './init/init-service';

// Creating a factory, which is a function that angular calls when creating and returning something
function initFactory(initService: InitService) {
  return () => initService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    },
    //This is the new way of writing interceptors in Angular, as the old key-value way was for writing class-based approaches, which isn't implemented anymore
    provideHttpClient(
      withInterceptors([requestInterceptor])
    ),
    // Using app initializers to fetch/load the content before the application loads
    // provideAppInitializer(() => {
    //   const initService = inject(InitService);
    //   return initService.init();
    // })  
  ]
};
