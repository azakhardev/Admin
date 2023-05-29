import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParamsOptions} from "@angular/common/http";
import {Observable} from "rxjs";
import { Admin } from '../models/admin';
import {SessionsService} from "./sessions.service";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private http: HttpClient,
              private sessions: SessionsService) { }

  public findAll(): Observable<Admin[]> {
    return this.http.get<Admin[]>(environment.api + '/api/Admins', this.options());
  }

  public findById(id: number): Observable<Admin> {
    return this.http.get<Admin>(environment.api + '/api/Admins/' + id, this.options());
  }

  public insert(Admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(environment.api + '/api/Admins', Admin, this.options());
  }

  public update(Admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(environment.api + '/api/Admins/' + Admin.id, Admin, this.options());
  }

  public delete(Admin: Admin): Observable<Admin> {
    return this.http.delete<Admin>(environment.api + '/api/Admins/' + Admin.id, this.options());
  }

  private options(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.sessions.getToken()
      })
    };
  }
}
