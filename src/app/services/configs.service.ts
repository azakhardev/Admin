import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../models/config';
import { Source } from '../models/source';
import { ComputersConfigs } from '../models/computersConfigs';
import { SourceToPost } from '../models/source-to-post';
import { Destination } from '../models/destination';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {


  private baseUrl = 'https://localhost:7140/api/Configs';

  constructor(private http: HttpClient) { }

  public getConfigs(): Observable<Config[]> {
    return this.http.get<Config[]>(this.baseUrl);
  }

  public deleteConfig(configId: number): Observable<Config> {
    const url = `${this.baseUrl}/${configId}`;
    return this.http.delete<Config>(url);
  }

  public getConfigsForComputer(computerId: number): Observable<Config[]> {
    const url = `https://localhost:7140/api/Computers/${computerId}/Configs`;
    return this.http.get<Config[]>(url);
  }

  public getSources(configId: number): Observable<Source[]> {
    // const url = `${this.baseUrl}/${configId}/Sources`;
    const url = `https://localhost:7140/api/Configs/${configId}/Sources`;
    return this.http.get<Source[]>(url);
  }

  public deleteConfigFromComputer(computerId: number, configId: number): Observable<ComputersConfigs> {
    const url = `https://localhost:7140/api/ComputersConfigsCtr/${computerId}/${configId}`;
    return this.http.delete<ComputersConfigs>(url);
  }

  public postSource(source: SourceToPost): Observable<SourceToPost>
  {
    return this.http.post<SourceToPost>('https://localhost:7140/api/Configs/Sources', source);
  }
  public postDestination(destination: Destination): Observable<Destination>
  {
    return this.http.post<Destination>('https://localhost:7140/api/Configs/Destinations', destination);
  }

  public deleteSource(id: number): Observable<Source>
  {
    return this.http.delete<Source>('https://localhost:7140/api/Configs/' + id +'/Source');
  }

  public deleteDestination(id: number): Observable<Destination>
  {
    return this.http.delete<Destination>('https://localhost:7140/api/Configs/' + id +'/Destination');
  }

  /*
  public addComputer(computerId: number,configId: number)
  {
   this.http.post('https://localhost:7140/api/ComputersConfigs/' + computerId + '/' + configId, {})
  }

  public deleteComputer(computerId: number,configId: number)
  {
    this.http.delete('https://localhost:7140/api/ComputersConfigs/'+ computerId + '/' + configId, {})    
  }
 */

  public saveChanges(config: Config): Observable<Config>
  {
   return this.http.put<Config>('https://localhost:7140/api/Configs/' + config.id, config); 
  }
}
