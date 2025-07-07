import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  localItem: string;
  constructor() {
    // Trying to get an item from localStorage, which is an in-built variable within angular
    this.localItem = localStorage.getItem('todos');
    if(this.localItem == null)  {
      // Initialise the todos array to null
      this.todos = [];
    }
    else  {
      // parse the todos array
      this.todos = JSON.parse(this.localItem);
    }
  }

  ngOnInit(): void {
  }

  deleteTodo(todo: Todo)  {
    console.log(todo);
    const array = this.todos.indexOf(todo);
    if (array !== -1) 
    {
      this.todos.splice(array, 1);
    }
    // removing an item from the local storage file, thus permanently deleting it even 
    // after reloading the application
    localStorage.setItem('todos',JSON.stringify(this.todos));
  }
  
  todoAdd(todo: Todo) {
    console.log(todo);
    this.todos.push(todo);
    // adds an item in todos list to the local storage, which permanently adds the item to
    // the list even after refreshing the application
    localStorage.setItem('todos',JSON.stringify(this.todos));
  }

  todoDone(todo:Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;
    localStorage.setItem('todos',JSON.stringify(this.todos));
    
  }
}
