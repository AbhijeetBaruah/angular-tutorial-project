import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DataResource } from '../common/data';
import { DataService } from './data.service';


@Injectable({providedIn: 'root'})
export class PostService extends DataService{

  
  constructor(httpClient:HttpClient,data:DataResource) {
    
    data.setUrl("http://jsonplaceholder.typicode.com/posts");
    super(httpClient,data);
   }
  

}
