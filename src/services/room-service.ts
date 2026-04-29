import { Injectable } from '@angular/core';
import { RoomList } from '../app/rooms/roomsCustom';
import { environment } from '../environment/environment';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Rooms } from '../app/rooms/rooms';

//'providedIn: root' basically means over here that this service is avaiable globally on the app
//If this is not added, then the service does not get registered and thus no one will be able to access it
@Injectable({
  providedIn: 'root'
})

//Services are something you can use anywhere within the project, in any component to minimise congestion within any component
export class RoomService {

  //Adding the roomList variable here to provide an example of service usage
  roomList: RoomList[] = [
  ]
  
  constructor(private http: HttpClient) {
  }
  
  //Function that will be used when instantiating the service, wherever and whenver required
  fetchRoomList() {
    //Returns the variable roomList
    // return this.roomList;

    //Type RoomList array. url mentioned here is incomplete because the rest of it has already been configured as a proxy in proxy.conf
    return this.http.get<RoomList[]>('/api/rooms');
  }

  //Adding variable 'room' with datatype RoomList as we need to add another room
  addRoom(room: RoomList) {
    //Code used to demonstrate POST functionality using Angular's HTTP requests
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  //Function to deal with updation of room details via PUT or PATCH (Using PUT in this case)
  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);    
  }

  //Delete HTTP method functionality, where we only need the ID to delete the record
  deleteRoom(id: number) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  //Pseudo HTTP request to fetch records
  getData() {
    //For more information on the HttpRequest function, Ctrl + click on it.
    const request = new HttpRequest(
      'GET', 'https://jsonplaceholder.typicode.com/photos',
      {
        reportProgress: true,
      }
    );

    return this.http.request(request);
  }
}
