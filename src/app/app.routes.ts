import { Routes } from '@angular/router';
import { Rooms } from './rooms/rooms';
import { Header } from './header/header';
import { App } from './app';

export const routes: Routes = [
    { path: 'rooms', component: Rooms },
    { path: 'header', component: Header },
    { path: '', component: App },
    //This is in case if you want to redirect to an existing route mentioned above
    //pathMatch: 'full' makes sure that the entire url is matched correctly
    // { path: '', redirectTo: '/rooms', pathMatch: 'full' },
];
