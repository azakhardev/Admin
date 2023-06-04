import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { Config } from '../models/config';
import { Computer } from '../models/computer';

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

  public getConfig(configId: number): Observable<Config>
  {
    return this.http.get<Config>('https://localhost:7140/api/Configs/' + configId)
  }

  public getComputer(computerId: number): Observable<Computer>
  {
    return this.http.get<Computer>('https://localhost:7140/api/Computers/' + computerId)
  }


  public addConfigToGroup(groupId: number, configId: number) : Observable<string>{
    return this.http.post<string>('https://localhost:7140/api/GroupsConfigs/' + groupId + '/' + configId, {})
  }

  public deleteConfigFromGroup(groupId: number, configId: number) : Observable<string>
  {
    return this.http.delete<string>('https://localhost:7140/api/GroupsConfigs/' + groupId + '/' + configId)
  }

  public addComputerToGroup(computerId: number, groupId: number) : Observable<string> {
    return this.http.post<string>('https://localhost:7140/api/ComputersGroups/' + computerId + '/' + groupId, {})
  }
  
  public deleteComputerFromGroup(computerId: number,groupId: number) : Observable<string>
  {
    return this.http.delete<string>('https://localhost:7140/api/ComputersGroups/' + computerId + '/' + groupId)
  }

  public postGroup(group: Group) : Observable<Group>
  {
   return this.http.post<Group>('https://localhost:7140/api/Groups', group) 
  }

  public putGroup(group: Group) : Observable<Group>
  {
    return this.http.put<Group>('https://localhost:7140/api/Groups/' + group.id, group) 
  }

}
