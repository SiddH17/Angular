import { Injectable } from '@angular/core';
import { RoomList } from '../app/rooms/roomsCustom';

//'providedIn: root' basically means over here that this service is avaiable globally on the app
@Injectable({
  providedIn: 'root',
})
  
//Services are something you can use anywhere within the project, in any component to minimise congestion within any component
export class RoomService {

  //Adding the roomList variable here to provide an example of service usage
  roomList: RoomList[] = [
    {
      roomType: 'Deluxe',
      price: 700,
      checkinDate: new Date('2001-07-21'),
      chances: 0.33
    },
    {
      roomType: 'Super Deluxe',
      price: 1000,
      checkinDate: new Date('2021-09-09'),
      chances: 0.25
    },
    {
      roomType: 'Suite',
      price: 2000,
      checkinDate: new Date('2018-10-03'),
      chances: 0.10
    }
  ]
  
  constructor() {
    console.log("This is an instantiation of the RoomsService service");
  }
  
  //Function that will be used when instantiating the service, wherever and whenver required
  fetchRoomList() {
    //Returns the variable roomList
    return this.roomList;
  }
}
