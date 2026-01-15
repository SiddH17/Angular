import { AfterViewChecked, AfterViewInit, Component, DoCheck, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RoomNumbers, RoomList } from './roomsCustom';
import { NgClass, NgStyle, UpperCasePipe, PercentPipe, DatePipe, CurrencyPipe, JsonPipe, SlicePipe } from "@angular/common";
import { RoomListComponent } from './room-list/room-list';
import { Header } from '../header/header';
import { Head } from 'rxjs';
import { RoomService } from '../../services/room-service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [NgClass, NgStyle, RoomListComponent, JsonPipe, Header],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms implements DoCheck, AfterViewInit, AfterViewChecked  {
  sampleName = 'Angular Practice 101';
  sampleNumber = 92;
  hideRooms = true;
  
  //Helps in intialising/creating the component
  //In the parameter, we specify the services that need dependency injection(DI), which is a design pattern to instantiate to use services
  //We should NEVER let the template see these DIs, so we always make them private
  constructor(private roomsList: RoomService) {
    //Using this, we can fetch the list of rooms from the service
    this.roomList = this.roomsList.fetchRoomList();
  }

  //Implementing the interface mentioned in roomsCustom.ts file
  rooms: RoomNumbers = {
    availableRooms: 15,
    bookedRooms: 5
  };


  @ViewChild(Header, { static: true }) header!: Header;

  //ViewChildren decorator is used when we need to access multiple instances of same type (Header in this case)
  //ViewChildren is of type QueryList as we need to access multiple elements
  @ViewChildren(Header) viewChildrenComponent!: QueryList<Header>;

  //Declaring variable to test onChanges lifecycle hook
  title = 'Room List';

  //Initialising roomList type variable
  roomList: RoomList[] = []

  //Defining variable to use for switch case statement (ngSwitch)
  switching = "cases"  

  //Part of lifecycle hook, which is triggered when anything in a component meets the condition
  //ngOnInit is triggered after the component is created via the constructor
  ngOnInit(): void {
  }

  //This is a way of calling services, only to be used when there is no dependency on Angular
  // listOfRooms = new RoomService();

  //Value that has been outputted by child class (room-list) and being declared here
  selectedRoom!: RoomList;

  //DoCheck() lifecycle hook is only called when any DoChanges() hook is uncontrolled
  //Rarely used, and it is better to avoid this as this does not serve any purpose, only use this for extreme use cases
  ngDoCheck(): void {
    console.log('On Check is called');
  }

  //AfterViewInit() is used to access components that cannot be accessed
  //Destroyed components can only be access from here, unless static is true
  ngAfterViewInit(): void {   
    //Changes the title of the first instance of viewChildrenComponent queryList only
    this.viewChildrenComponent.first.title = "Hello First title";
    console.log(this.viewChildrenComponent.first.title);
  }

  //This lifecycle hook is triggered after the view is checked by Angular
  //Preferably used in dev mode as the content is checked twice in the DOM and an error is returned
  //However, this is only in dev mode and if it's in production mode, there is an actual issue
  ngAfterViewChecked(): void {
    // console.log(this.header, "The header");
    // this.header.title = 'Hello view checked';
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
