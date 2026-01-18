import { Component, signal, AfterViewInit, ViewChild, ViewContainerRef, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Rooms } from "./rooms/rooms";
import { ContentContainer } from './content-container/content-container';
import { Header } from './header/header';

//Decorator, used to modify/enhance the behaviour of the class
@Component({
  //Your HTML tag, which you can reuse anywhere within the app
  //The 'app' prefix can be changed in angular.json
  //Once you change the prefix there, you will have to change it everywhere in the app
  selector: 'app-root',
  //Includes the classes to be imported (Implemented)
  imports: [RouterOutlet, Rooms, ContentContainer, Header],
  //Your default HTML/view template
  templateUrl: './app.html',
  //This is also a way of using templates
  // template: `<h1>Hello World, from templates side!</h1>`,
  //Your default CSS template
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnInit  {
  protected readonly title = signal('testangularapp');

  //Injecting the localStorageToken here with type any to avoid any errors and to be on the safe side
  // constructor(@Inject(localStorageToken) private localStorageToken: any) {
  // }

  ngOnInit(): void {
    //You can check this value 
    // this.localStorageToken.setItem('name', 'This is a sample name');
  }

  //ViewChild here is used to read the component class of Rooms
  //ViewContainerRef can attach one or more views to a component
  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  ngAfterViewInit(): void {
    //Variable creates a new component of Rooms via createComponent() function
    const componentRef = this.vcr.createComponent(Rooms);
    componentRef.instance.sampleNumber = 19;
  }
}
