import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config';
import { SessionsService } from 'src/app/services/sessions.service';
import { Computer } from 'src/app/models/computer';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  
  unassignedConfigs: Config[];
  unassignedComputers: Computer[];

  constructor(
    private sessionsService: SessionsService,
    private groupService: GroupsService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
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
    this.groupService.addComputerToGroup(computerId,this.group.id).subscribe()
    window.location.reload()
  }

  deleteComputer(computerId:number)
  {
    this.groupService.deleteComputerFromGroup(computerId,this.group.id).subscribe()
    window.location.reload()
  }

  addConfig(configId: number)
  {
    this.groupService.addConfigToGroup(this.group.id,configId).subscribe()
    window.location.reload()
  }

  deleteConfig(configId: number)
  {
    this.groupService.deleteConfigFromGroup(this.group.id,configId).subscribe()
    window.location.reload()
  }

submit(groupName: string, description: string)
{
  this.group.groupName = groupName;
  this.group.description = description;
  this.groupService.putGroup(this.group).subscribe(() => this.router.navigate(['/Groups']))

}
  protected readonly parseInt = parseInt;
}
