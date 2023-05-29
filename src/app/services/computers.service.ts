import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Computer } from '../models/computer';
import { Config } from '../models/config';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class ComputersService {

  private baseUrl = 'https://localhost:7140/api/Computers';

  constructor(private http: HttpClient) { }

  public getComputers(): Observable<Computer[]> {
    return this.http.get<Computer[]>(this.baseUrl);
  }

  public deleteComputer(computerId: number): Observable<Computer> {
    const url = `${this.baseUrl}/${computerId}`;
    return this.http.delete<Computer>(url);
  }

  public putComputer(computer: Computer): Observable<Computer> {
    const url = `${this.baseUrl}/${computer.id}`;
    return this.http.put<Computer>(url, computer);
  }

  public getComputer(computerId: number): Observable<Computer> {
    const url = `${this.baseUrl}/${computerId}`;
    return this.http.get<Computer>(url);
  }

  public getComputerNameById(id: number): Observable<string> {
    return this.http.get<string>(`https://localhost:7140/api/Logs/ComputerName/${id}`)
  }

  public getUnauthorizedComputers(computers: Computer[]){
    
  }

  /*public getGroups(id: number): Observable<Group[]>  {
   return this.http.get<Group[]>('https://localhost:7140/api/Groups') 
  }
  
  public getConfigs(): Observable<Config[]>  {
    return this.http.get<Config[]>('https://localhost:7140/api/Configs') 
   }*/
 

}
