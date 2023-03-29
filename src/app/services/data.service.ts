import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  configUrl: any = environment.rootUrl;
  constructor(private http: HttpClient) { }


  // getData(): Observable<HttpResponse<any>> {
  //   return this.http.get(
  //     this.configUrl, { observe: 'response' });
  // }


  getData(functionName: any) {
    return this.http.get(this.configUrl + functionName)
  }

  postData(functionName: any, data: any) {
    return this.http.post(this.configUrl + functionName, data)
  }
  updateData(functionName: any, data: any) {
    return this.http.put(this.configUrl + functionName, data)
  }


  
}
