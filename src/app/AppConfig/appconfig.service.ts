//This file is used as a service for app config

import { InjectionToken } from "@angular/core";
import { AppConfig } from "./appconfig.interface";
import { environment } from "../../environment/environment";

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

//Creating a value provider to show apiEndpoint
export const APP_CONFIG: AppConfig = {
    apiEndpoint: environment.apiEndpoint
}