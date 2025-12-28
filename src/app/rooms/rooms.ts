import { AfterViewInit, Component, DoCheck, ViewChild } from '@angular/core';
import { RoomNumbers, RoomList } from './roomsCustom';
import { NgClass, NgStyle, UpperCasePipe, PercentPipe, DatePipe, CurrencyPipe, JsonPipe, SlicePipe } from "@angular/common";
import { RoomListComponent } from './room-list/room-list';
import { Header } from '../header/header';
import { Head } from 'rxjs';

@Component({
  selector: 'app-rooms',
  imports: [NgClass, NgStyle, RoomListComponent, JsonPipe, Header],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms implements DoCheck, AfterViewInit  {
  sampleName = 'Angular Practice 101';
  sampleNumber = 92;
  hideRooms = true;
  
  //Helps in intialising/creating the component
  constructor() { }

  //Implementing the interface mentioned in roomsCustom.ts file
  rooms: RoomNumbers = {
    availableRooms: 15,
    bookedRooms: 5
  };

  @ViewChild(Header, { static: true }) header!: Header;

  //Declaring variable to test onChanges lifecycle hook
  title = 'Room List';

  //Initialising roomList type variable
  roomList: RoomList[] = []

  //Defining variable to use for switch case statement (ngSwitch)
  switching = "cases"  

  //Part of lifecycle hook, which is triggered when anything in a component meets the condition
  //ngOnInit is triggered after the component is created via the constructor
  ngOnInit(): void {
    this.roomList = [
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
  }

  selectedRoom!: RoomList;

  //DoCheck() lifecycle hook is only called when any DoChanges() hook is uncontrolled
  //Rarely used, and it is better to avoid this as this does not serve any purpose, only use this for extreme use cases
  ngDoCheck(): void {
    console.log('On Check is called');
  }

  //AfterViewInit() is used to access components that cannot be accessed
  //Destroyed components can only be access from here, unless static is true
  ngAfterViewInit(): void {
    console.log(this.header, "The header");   
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'List of Rooms'; //Change the title to list of rooms when toggle button is clicked
    console.log("Title right now: ", this.title);
  }

  // Passing the final function/value of the component from here
  selectingRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  //Statically adding rooms
  addRoom() {
    //Creating a new room statically
    const room: RoomList = {
        roomType: 'Deluxe Prime',
        price: 210,
        checkinDate: new Date('2023-10-29'),
        chances: 0.29
    }

    //Pushing the creation of the new room when the function is called
    // this.roomList.push(room);

    //Using spread operator(...) for immutability, so that we don't change the data passed
    this.roomList = [...this.roomList, room];
  }
}
