import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Rooms } from "./rooms/rooms";

//Decorator, used to modify/enhance the behaviour of the class
@Component({
  //Your HTML tag, which you can reuse anywhere within the app
  //The 'app' prefix can be changed in angular.json
  //Once you change the prefix there, you will have to change it everywhere in the app
  selector: 'app-root',
  //Includes the classes to be imported (Implemented)
  imports: [RouterOutlet, Rooms],
  //Your default HTML/view template
  templateUrl: './app.html',
  //This is also a way of using templates
  // template: `<h1>Hello World, from templates side!</h1>`,
  //Your default CSS template
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('testangularapp');
}
