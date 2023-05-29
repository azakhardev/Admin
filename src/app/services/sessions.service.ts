import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>('https://localhost:7140/api/AdminLoginCtr', { username: username, password: password }).pipe(
      tap(result => sessionStorage.setItem('super-secret-foo', result.token))
    );
  }

  
  public logout(): void {
    sessionStorage.removeItem('super-secret-foo');
  }

  public getToken(): string | null {
    return sessionStorage.getItem('super-secret-foo');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }
}