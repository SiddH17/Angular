import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

//This is a type of decorator that is used from  @angular/core module
@Component({
    selector: 'courses', //Selects any element with 'courses'
    template: `<h2>{{ title }}</h2>
        <ul>
            <!-- *ngFor is called a directive, which manipulates the DOM, used like an attribute -->
            <!-- Here, we have used a for loop as a value within the directive attribute -->
            <li *ngFor='let course of courses'>{{ course }}</li>
        </ul>
    `,    //This replaces the selector
})

export class CoursesComponent   {
    title = 'The 3 authors';
    courses;

    //Here as a parameter we have created a dependancy of type CoursesService so that we
    //don't have to modify all the time whenever we change the constructor of CoursesService
    //If we write new CoursesService inside the constructor, we tightly couple the service
    //with the component. Passing it as a parameter helps decouple the two.
    //This is also known as dependency injection
    constructor(service: CoursesService)   {
        this.courses = service.getCourses();
    }

    //To get course names or similar logics from server, we use a service, but however we
    //Don't just write the HTTP service otherwise the component will just get tightly 
    //Coupled with that endpoint which may cause problems for other services

    //Components anyway should not contain any logic other than the presentation (frontend)
    //logic

    //This function can be used to change the logic dynamically
    getTitle()  {
        return this.title;
    }
}