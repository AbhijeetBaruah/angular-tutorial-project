import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request';
import { DataResource } from '../common/data';
import { NotFoundError } from '../common/not-found';





export class DataService {
    
    private url:string;
  constructor(private httpClient:HttpClient,data:DataResource) {
      this.url = data.getUrl();
  }


  getAll():Observable<any>{
    return this.httpClient.get<any>(this.url).pipe(
      catchError(this.errorHandler)
    )
  }

  create(resource:any):Observable<any>{
    
    return this.httpClient.post(this.url,resource).pipe(
      catchError(this.errorHandler)
    );    
  }


  private errorHandler(error:Response){

    if(error.status === 404){
      return throwError(new NotFoundError());
    }
    if(error.status === 400)
          return throwError(new BadRequestError(error.json()));
        
    //this error is unexpected error so we will log this
    return throwError(new AppError(error));
  }
}
