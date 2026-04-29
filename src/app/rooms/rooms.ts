import { AfterViewChecked, AfterViewInit, Component, DoCheck, Inject, OnInit, Optional, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { RoomNumbers, RoomList } from './roomsCustom';
import { NgClass, NgStyle, UpperCasePipe, PercentPipe, DatePipe, CurrencyPipe, JsonPipe, SlicePipe } from "@angular/common";
import { RoomListComponent } from './room-list/room-list';
import { Header } from '../header/header';
import { Head, Observable } from 'rxjs';
import { RoomService } from '../../services/room-service';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [NgClass, NgStyle, RoomListComponent, JsonPipe, Header],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms implements OnInit, DoCheck, AfterViewInit, AfterViewChecked  {
  sampleName = 'Angular Practice 101';
  sampleNumber = 92;
  hideRooms = true;
  
  //Helps in intialising/creating the component
  //In the parameter, we specify the services that need dependency injection(DI), which is a design pattern to instantiate to use services
  //We should NEVER let the template see these DIs, so we always make them private
  //We use skipself decorator here when we don't want this particular component to use the service
  // constructor(@SkipSelf() private roomsList: RoomService) {
  //   //Using this, we can fetch the list of rooms from the service
  //   // this.roomList = this.roomsList.fetchRoomList();
  // }

  //One way to use value providers as dependency injection is via Inject Token
  //Refer to AppConfig folder for the service created, as Angular does not support value providers the same way it provides class-based providers
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, @SkipSelf() private roomService: RoomService) {
    console.log(this.config.apiEndpoint)
  }

  //We use the Optional() decorator (resolution modifier type) when, if the service is present then execute otherwise ignore if not present
  // constructor(@Optional() private roomsList: RoomService) {
  //   //Using this, we can fetch the list of rooms from the service
  //   // this.roomList = this.roomsList.fetchRoomList();
  // }

  //We use the Host() decorator when we want to define an instance of the service within this component itself
  // constructor(@Host() private roomsList: RoomService) {
  //   //Using this, we can fetch the list of rooms from the service
  //   // this.roomList = this.roomsList.fetchRoomList();
  // }

  //Implementing the interface mentioned in roomsCustom.ts file
  rooms: RoomNumbers = {
    availableRooms: 15,
    bookedRooms: 5
  };

  // Observable is a stream of continuous data, used by RxJs, that implements push architecture
  stream = new Observable(observer => {
    //next() function is to basically print the next stream of data
    observer.next('user1');
    observer.next('user2');
    //complete() function is to indicate that the observable has been completed
    observer.complete();
    //error() function is used for error/exception handling
    // observer.error('error');
  })

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

  //totalBytes is used to display the totla number of bytes of data loaded
  totalBytes = 0;

  //Adding variable 'contentBytes' for showing loading of data via request API
  contentBytes = 0;

  //Part of lifecycle hook, which is triggered when anything in a component meets the condition
  //ngOnInit is triggered after the component is created via the constructor
  ngOnInit(): void {
    //Subscribe is a push implementation from RxJS, where if we pull the data once, then a continuous stream of data is returned.
    //This means that the data keeps getting pulled 
    this.roomService.fetchRoomList().subscribe(rooms => {
      this.roomList = rooms;
    });

    //Implementing the request API created in room-service file
    this.roomService.getRequest().subscribe((event) => {
      //Creating a switch-case event to track the progress of content download
      //This will be more useful for larger amounts of data
      switch (event.type) {
        case HttpEventType.Sent:
          console.log("The request has been sent to the server");
          break;
        
        case HttpEventType.ResponseHeader:
          console.log("The server has received the request sent");
          break;
        
        case HttpEventType.DownloadProgress:
          //Tracking the bytes of data fetched from the API (Jsonplaceholder in this case)
          this.contentBytes += event.loaded;
          console.log("Downloading the content and tracking the same: ", this.contentBytes);
          break;
        
        case HttpEventType.Response:
          console.log("Response received successfully!");
          break;
        }
    });

    //Calling the observable 'stream' to print the stream of data entered
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (error) => console.log(error)  
    });
    //Another way of writing the same stream of data as above
    this.stream.subscribe((data) => console.log(data));

    //Observable to handle HttpRequest API call
    this.roomService.getData().subscribe((event) => {
      switch (event.type) {
        //Ctrl + click to know more about each flag in the below function
        //Sent has a flag of 0
        case HttpEventType.Sent:
          console.log("The requests have been sent successfully");
          break;
        //UploadProgress has a flag of 1
        case HttpEventType.UploadProgress:
          console.log("The uploading of data is in progress");
          break;
        //ResponseHeader has a flag of 2
        case HttpEventType.ResponseHeader:
          console.log("The request has been successfully made!");
          break;
        //DownloadProgress has a flag of 3
        case HttpEventType.DownloadProgress:
          //Shows how much content has been fetched/loaded from the API
          this.totalBytes += event.loaded;
          break;
        //Response from the server has a flag of 4
        case HttpEventType.Response:
          console.log(event.body);
      }
    });
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
        roomNumber: 4,
        roomType: 'Deluxe Prime',
        price: 210,
        checkinDate: new Date('2023-10-29'),
        chances: 0.29
    }

    //Pushing the creation of the new room when the function is called
    // this.roomList.push(room);

    //Using spread operator(...) for immutability, so that we don't change the data passed
    // this.roomList = [...this.roomList, room];

    //Using RxJS observable and HTTP requests to add rooms via POST request
    this.roomService.addRoom(room).subscribe((data) => {
      this.roomList = data;
      console.log(this.roomList, "The data of the room being added");
    });
  }

  //Function to update the room details (PUT,PATCH)
  editRoom() {
    const room: RoomList = {
    roomNumber: 1,
    roomType: 'Deluxe Prime',
    price: 210,
    checkinDate: new Date('2023-10-29'),
    chances: 0.29
    }

    this.roomService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    //Here, 2 is the ID of the item to be deleted
    this.roomService.deleteRoom(2).subscribe((data) => {
      this.roomList = data;
    });
  }
}
