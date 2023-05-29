import { Component, OnInit } from '@angular/core';
import { ConfigsService } from 'src/app/services/configs.service';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/models/config';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.scss'],
  providers: [ConfigsService]
})
export class ConfigsComponent implements OnInit{
  public config: Config[] = [];

  constructor(private configsService: ConfigsService, private http: HttpClient, private router:Router,private sessionsService: SessionsService){}

  ngOnInit(): void {
    this.http.get<Config[]>('https://localhost:7140/api/Configs').subscribe(result =>{
      this.config = result;
      console.log(this.config);
    });
  }
  goToConfigDetail(configName: string) {
    this.router.navigate([configName]);
  }

  public delete(config: Config): void {
    this.configsService.deleteConfig(config.id).subscribe(() => {
      this.config = this.config.filter(c => c.id !== config.id); 
    });
  }

  logout() {
    this.sessionsService.logout();
  }
}
