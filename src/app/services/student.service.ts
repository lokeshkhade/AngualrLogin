import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  configUrl: any = environment.rootUrl;
  constructor(private http: HttpClient) { }

  getKisan() {
    return this.http.get('https://kisan.cg.nic.in/kisanApi/farmer/getFarmerDetailsByKey/2/1000264/')
  }

}
