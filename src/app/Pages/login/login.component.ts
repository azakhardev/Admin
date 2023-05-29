import { Component, OnInit } from '@angular/core';
import {SessionsService} from "../../services/sessions.service";
import {Router} from "@angular/router";
import { Admin } from 'src/app/models/admin';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
username: string = '';
password: string = '';
error: boolean = false;

constructor(private router: Router,
private sessions: SessionsService) {
}

public ngOnInit(): void {
}

public login(): void {
this.sessions.login(this.username, this.password).pipe(
    catchError((err: HttpErrorResponse) => {
      this.error = true;
      return of(false);
    })
  ).subscribe(result => {
if (result) {
this.router.navigate([ '/Home' ])
}
});
}
}