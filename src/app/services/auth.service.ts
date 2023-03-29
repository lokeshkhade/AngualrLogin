import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private helper: JwtHelperService, private router: Router) { }

    
  get currentUser() 
  {
    let token = localStorage.getItem('token');
    if (token) 
    {
      let isExpired = this.helper.isTokenExpired(token);
      if (!isExpired) 
      {
        return this.helper.decodeToken(token);
      } 
      else 
      {
        this.logout();
      }
    }
  }

  logout() 
  {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
