import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private baseUrl = 'https://localhost:7140/api/Groups';

  constructor(private http: HttpClient) { }

  public getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }

  public deleteConfig(groupId: number): Observable<Group> {
    const url = `${this.baseUrl}/${groupId}`;
    return this.http.delete<Group>(url);
  }

  public getGroupsForComputer(computerId: number): Observable<Group[]> {
    const url = `https://localhost:7140/api/Computers/${computerId}/Groups`;
    return this.http.get<Group[]>(url);
  }
}
