import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config';
import { SessionsService } from 'src/app/services/sessions.service';
import { Computer } from 'src/app/models/computer';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';
import { ActivatedRoute, Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit{
  groupId: any;
  group: Group;
  
  configs: Config[];
  computers: Computer[];
  
  selectedComputer: Computer;
  selectedConfig: Config;

  selectedComputerId: number;
  selectedConfigId: number;

  unassignedConfigs: Config[];
  unassignedComputers: Computer[];

  constructor(
    private sessionsService: SessionsService,
    private groupService: GroupsService,
    private route: ActivatedRoute,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.http.get<Group>('https://localhost:7140/api/Groups/' + this.route.snapshot.paramMap.get('Id')).subscribe(g => this.group = g)
    this.http.get<Config[]>('https://localhost:7140/api/Groups/' + this.route.snapshot.paramMap.get('Id') + '/Configs').subscribe(c => this.configs = c)
    this.http.get<Computer[]>('https://localhost:7140/api/Groups/' + this.route.snapshot.paramMap.get('Id') + '/Computers').subscribe(c => this.computers = c)    
    this.http.get<Config[]>('https://localhost:7140/api/Configs').subscribe(c => this.unassignedConfigs = c)
    this.http.get<Computer[]>('https://localhost:7140/api/Computers').subscribe(c => this.unassignedComputers = c)
    
  }

  logout() {
    this.sessionsService.logout();
  }

  addComputer(computerId: number)
  {
    console.log(this.selectedComputer);
    this.groupService.addComputerToGroup(computerId,this.group.id)
  }

  addConfig(configId: number)
  {    
    console.log(this.selectedConfig);
    this.groupService.addConfigToGroup(this.group.id,configId)
  }

  protected readonly parseInt = parseInt;
}
