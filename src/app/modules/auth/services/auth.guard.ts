import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { encryptStorage } from 'src/app/services/helper';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.islogging;
    if (currentUser) {
      // logged in so return true
      console.log("login")
      return true;
    }
console.log("logout")
    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
@Injectable({ providedIn: 'root' })
export class AuthGuard2 implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
 
    let user=encryptStorage.getItem("user");

    if(user.type==1)
    {
      return true
    }

    else{ 
      this.authService.logout2();
      
      return false}
  }
}


/* if (currentUser) {
  // logged in so return true
  return true;
}
else
{
  this.authService.logout();
  return false; 
}
*/
