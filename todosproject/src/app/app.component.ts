import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todosproject';

  constructor() {
    setTimeout(() =>  {
      this.title = 'Time to do something!';
    }, 2000);
  }
}
