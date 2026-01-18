// import { InjectionToken } from "@angular/core";

// //Creating an InjectionToken for local storage, as normally Dependency Injection works with classes
// //We use Dependency Injection(DI) because then we will tell Angular to inject the value/class rather than it searching for the value/class to be injected
// export const localStorageToken = new InjectionToken<any>('local storage', {
//     providedIn: 'root',
//     //Return a factory function with localstorage
//     factory() {
//         return localStorage;
//     }
// });