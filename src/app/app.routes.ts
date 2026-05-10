import { Routes } from '@angular/router';
import { Rooms } from './rooms/rooms';
import { Header } from './header/header';
import { App } from './app';
import { MissingPage } from './missing-page/missing-page';
import { RoomBooking } from './room-booking/room-booking';

export const routes: Routes = [
    { path: 'rooms', component: Rooms },
    { path: 'header', component: Header },
    { path: '', component: App },
    //Using dynamic routing to dynamically route to the particular item with the respective ID
    {path: 'rooms/:id', component: RoomBooking},
    //This is in case if you want to redirect to an existing route mentioned above
    //pathMatch: 'full' makes sure that the entire url is matched correctly
    // { path: '', redirectTo: '/rooms', pathMatch: 'full' },
    //Use this URL for when the URL is not found/recognised (indicated by '**')
    { path: '**', component: MissingPage },
];
