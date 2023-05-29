import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SessionsService } from './sessions.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate{

  constructor(private router: Router,
              private sessions: SessionsService) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> |boolean | UrlTree {
    const isAuthenticated = this.sessions.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['']); 
    }
    return isAuthenticated;
  }
}