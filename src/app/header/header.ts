import { Component } from '@angular/core';
import { RoomService } from '../../services/room-service';

//We use 'providers' here if we want a separate instance of the service to handle it differently
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  providers: [RoomService]
})
export class Header {
  title!: string; 

  name!: string;

  //If just the RoomService service is instantiated here, the constructor() in the service will be called by default
  constructor(private RoomsService: RoomService) {
  }
}
