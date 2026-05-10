import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map,Observable } from 'rxjs';

@Component({
  selector: 'app-room-booking',
  imports: [AsyncPipe],
  templateUrl: './room-booking.html',
  styleUrl: './room-booking.css',
})
export class RoomBooking {
  //Defining a single variable in case we want to retrieve only a singular ID
  // id !: number;

  //Defining a stream of data for multiple values
  id$ !: Observable<number>;

  //An ActivatedRoute is something that reads information about a router data passed
  constructor(private router: ActivatedRoute) {
    //ActivatedRoute is also an observable, so you can subscribe to the stream of data as well
    // this.router.params.subscribe((params) => {
    //   console.log(params['id']);
    // })

    //Getting all the streams of data using paramMap function, along with piping it
    this.id$ = this.router.paramMap.pipe(map((params) => Number(params.get('id'))));
    
    //Snapshots contain essential information about the route
    // this.id = this.router.snapshot.params['id'];
  }
}
