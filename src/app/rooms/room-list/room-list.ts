import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { RoomList } from '../roomsCustom';
import { NgClass, NgStyle, UpperCasePipe, PercentPipe, DatePipe, CurrencyPipe, JsonPipe, SlicePipe } from "@angular/common";

@Component({
  selector: 'app-room-list',
  imports: [UpperCasePipe, PercentPipe, DatePipe, CurrencyPipe, JsonPipe, SlicePipe],
  standalone: true,
  templateUrl: './room-list.html',
  styleUrl: './room-list.css',
})
export class RoomListComponent implements OnInit, OnChanges, OnDestroy {
  
  //@input decorator helps the rooms variable become a valid HTML component
  @Input() rooms: RoomList[] = [];

  //Inputting the 'title' variable from the parent component
  @Input() title!: string;

  //@output decorator helps send data to the parent component (rooms in this case)
  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() { }
  
  ngOnInit(): void{

  }

  //Whenever a change is detected from the parent component, this is called
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    //changes is a property that is indexed, thus we need to mention the same
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  //Using the emit() function to send the selected room data to the parent class
  roomSelect(room: RoomList) {
    this.selectedRoom.emit(room);
  }

  //OnDestroy is used when we need to destroy a component to save memory and space
  ngOnDestroy(): void {
    console.log("On Destroy is called");
  }
}
