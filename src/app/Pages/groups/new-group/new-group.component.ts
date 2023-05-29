import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config';
import { SessionsService } from 'src/app/services/sessions.service';
import { Computer } from 'src/app/models/computer';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';
import { ActivatedRoute, Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit{
  group: Group;
  
  configs: Config[];
  computers: Computer[];

  unassignedConfigs: Config[];
  unassignedComputers: Computer[];

  constructor(
    private sessionsService: SessionsService,
    private groupService: GroupsService,
    private route: ActivatedRoute,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.sessionsService.logout();
  }

  addComputer(computerId: number)
  {
    this.groupService.addComputerToGroup(computerId,this.group.id)
  }

  addConfig(configId: number)
  {    
    this.groupService.addConfigToGroup(this.group.id,configId)
  }

  protected readonly parseInt = parseInt;
}
