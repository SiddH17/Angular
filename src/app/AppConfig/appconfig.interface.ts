import { environment } from "../../environment/environment";

//Creating an interface where the AppConfig will be used with app_service_config to inject a token on custom basis
export interface AppConfig  {
    apiEndpoint: string;
}
