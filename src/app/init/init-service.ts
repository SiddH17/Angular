import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
  
//Using this initService as an app_initializer, which will execute before the application is loaded
export class InitService {
  //This will store the data loaded from file 'config.json'
  config: any;
  //Initalised httpClient using constructor so that API calls can be made from here on out
  constructor(private http: HttpClient) { }
  
  //Returning the config data fetched using get request from config.json
  //tap() is used to load the data and do something extra alongside like interacting with externals (eg: console)
  init() {
    console.log("INIT started");
    //Here we are using firstValueFrom instead, which means that we need to fetch the first observable data as a promise
    //A promise means that we don't have the data yet but we'll definitely receive it soon
    return firstValueFrom(
      this.http.get('/assets/config.json').pipe(tap((config) => (this.config = config)))
    );
  }
}
