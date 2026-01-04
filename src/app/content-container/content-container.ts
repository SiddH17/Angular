import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { Header } from '../header/header';

@Component({
  selector: 'app-content-container',
  imports: [],
  templateUrl: './content-container.html',
  styleUrl: './content-container.css',
})
export class ContentContainer implements AfterContentInit {
  //@contentchild decorator is used to access content within the components of a project
  @ContentChild(Header) headName!: Header;

  constructor() {

  }

  //This lifecycle hook is used if we want to load/instantiate anything after the content has loaded
  //This method is invoked immediately after all the directive content has been initialised by Angular
  ngAfterContentInit(): void {
    console.log(this.headName);
    this.headName.name = 'Max';
  }
}
