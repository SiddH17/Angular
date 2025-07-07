import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  //Event emitters help in emitting the event function being called to the HTML
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter()
  @Output() todoCheckbox: EventEmitter<Todo> = new EventEmitter()
  constructor() {  }

  ngOnInit(): void {
  }
  onClick(todo: Todo) {
    //This is the event that will be emitted to @Output() defined above
    this.todoDelete.emit(todo);
    console.log("Clicking onClick");
  }

  checkboxClick(todo) {
    console.log("ENtered the checkboxClick function");
    this.todoCheckbox.emit(todo);
  }
}
