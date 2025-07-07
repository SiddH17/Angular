import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//This got automatically called after I wrote 'CoursesComponent' in declarations
//A component contains the data, template as well as logic for a view
import { CoursesComponent } from './courses.component';
import { CoursesService } from './courses.service';

@NgModule({
  //These are all the components which will be used (their class names that is)
  declarations: [
    AppComponent,
    CoursesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  //providers will be all the dependencies or the services that will be used by various 
  //components. A single instance of the provider is passed on to all the components within
  //the project, which is also called as a singleton.
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
