import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/models/config';
import { SessionsService } from 'src/app/services/sessions.service';
import { Computer } from 'src/app/models/computer';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';
import { ActivatedRoute, Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit{
  groupId: number;
  group: Group;
  
  configs: Config[] = [];
  computers: Computer[] = [];
  
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
    this.group = new Group(0,'New_Group','Popisek',new Date(), 'Have not backuped')
    this.http.get<number>('https://localhost:7140/api/Groups/LastGroup').subscribe(x => this.group.id = x+1)
    this.http.get<Config[]>('https://localhost:7140/api/Configs').subscribe(c => this.unassignedConfigs = c)
    this.http.get<Computer[]>('https://localhost:7140/api/Computers').subscribe(c => this.unassignedComputers = c)    
    console.log(this.unassignedComputers)
  }

  logout() {
    this.sessionsService.logout();
  }

  addComputer(computerId: number)
  {    
    this.groupService.getComputer(computerId).subscribe(x => this.computers.push(x))
    console.log(this.computers)
   }

  deleteComputer(computerId:number)
  {
    window.location.reload()
  }

  addConfig(configId: number)
  {
    this.groupService.getConfig(configId).subscribe( x => this.configs.push(x))
    console.log(this.configs)
  }

  deleteConfig(configId: number)
  {
    window.location.reload()
  }

  submit(groupName: string, description: string)
  {
    this.group.groupName = groupName;
    this.group.description = description;
  
    this.groupService.postGroup(this.group).subscribe(() => {this.pushComputersConfigs()})
    this.router.navigate(['/Groups'])
  }

  pushComputersConfigs()
  {
    this.configs.forEach((config: Config) => 
    {
    this.groupService.addConfigToGroup(this.group.id,config.id).subscribe() 
    });

    this.computers.forEach((computer: Computer) =>
    {
    this.groupService.addComputerToGroup(computer.id, this.group.id).subscribe()  
    }) 
  }


  protected readonly parseInt = parseInt;
}
