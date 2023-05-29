import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../models/report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl = 'https://localhost:7140/api/Logs';

  constructor(private http: HttpClient) { }

  public getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.baseUrl);
  }
}
