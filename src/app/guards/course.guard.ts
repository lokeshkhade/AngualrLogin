import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {  Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class CourseGuard implements CanActivate {

  constructor(
    private router: Router,
    private authservice: AuthService
  ) { }

  canActivate()  {
    const user = this.authservice.currentUser;
    console.log('role',user);
    
    if (user && ( user.role === 1)) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
    
  }
  
}
