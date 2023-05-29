import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  private baseUrl = 'https://localhost:7140/api/Admins';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseUrl);
  }

  public deleteAdmin(adminId: number): Observable<Admin> {
    const url = `${this.baseUrl}/${adminId}`;
    return this.http.delete<Admin>(url);
  }

  public addAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.baseUrl, admin);
  }

  public editAdmin(adminId: number): Observable<Admin> {
    const url = `${this.baseUrl}/${adminId}`;
    return this.http.post<Admin>(url, adminId);
  }

  //public updateAdmin(admin: Admin): Observable<Admin> {
    //const url = `${this.baseUrl}/${admin.id}`;
    //return this.http.put<Admin>(url, admin, this.httpOptions);
  //}

  public updateAdmin(admin: Admin): Observable<Admin> {
    return this.http.put<Admin>('https://localhost:7140/api/Admins/' + admin.id, admin);
  }
}
