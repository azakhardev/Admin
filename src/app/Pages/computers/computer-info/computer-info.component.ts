import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigsService } from 'src/app/services/configs.service';
import { GroupsService } from 'src/app/services/groups.service';
import { Config } from 'src/app/models/config';
import { Computer } from 'src/app/models/computer';
import { Group } from 'src/app/models/group';
import { ComputersService } from 'src/app/services/computers.service';
import { ComputersConfigs } from 'src/app/models/computersConfigs';
import { ComputersGroups } from 'src/app/models/computersGroups';
import { SessionsService } from 'src/app/services/sessions.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-computer-info',
  templateUrl: './computer-info.component.html',
  styleUrls: ['./computer-info.component.scss']
})
export class ComputerInfoComponent implements OnInit {
  computer: Computer;
  configs: Config[] = [];
  computerGroups: Group[] = [];
  selectedConfig: number = 0;
  computerGroupsNames: string[] = [];
  allGroupNames: string[] = [];
  group: Group;
  allGroups: Group[] = [];
  selectedGroup: Group[] = [];
  
  constructor(private route: ActivatedRoute,
     private http: HttpClient,
      private configService: ConfigsService,
       private groupService: GroupsService, 
       private computerService: ComputersService,
       private sessionsService: SessionsService,
       private router: Router
       )
       {}

  ngOnInit(): void {
    this.http.get<Computer>('https://localhost:7140/api/Computers/' + this.route.snapshot.paramMap.get('Id')).subscribe(computerResult => {
    this.computer = computerResult;  
    
    this.configService.getConfigsForComputer(this.computer.id).subscribe(computerConfigs => {
    this.configs = this.configs;
  });
    this.computerService.getComputer(this.computer.id).subscribe(computerDescription => {
      this.computer = computerDescription;
    })    

    this.groupService.getGroups().subscribe(allGroups =>{
      this.allGroups = allGroups;

      this.allGroups.forEach(group => {
        this.allGroupNames.push(group.groupName);
      });
  
    })

    this.http.get<Config[]>('https://localhost:7140/api/Computers/' + this.computer.id + '/Configs').subscribe(configsResult => {
    this.configs = configsResult;

    //this.awailable_configs = this.configService.getConfigs();

    this.groupService.getGroupsForComputer(this.computer.id).subscribe(groups => {
      this.computerGroups = groups; 

  });
});
  },)

}


removeGroupFromComputer(group: Group) {  

  this.http.delete<ComputersGroups>(`https://localhost:7140/api/ComputersGroupsCtr/${this.computer.id}/${group.id}`).subscribe(response => {
    console.log('Group added:', response);
  },
  error => {
    console.log('Error:', error)
  })

  const index = this.computerGroups.indexOf(group);
  this.computerGroups.splice(index, 1);

  this.updateComputerGroups();

}

addGroupToComputer(){

  this.http.post(`https://localhost:7140/api/ComputersGroupsCtr/${this.computer.id}/${this.selectedGroup}`, {}).subscribe(response => {
    console.log('Config added:', response);
  },
  error => {
    console.log('Error:', error)
  })

  this.updateComputerConfigs();

  this.ngOnInit();
}

updateComputer(){
  this.http.put<Computer>('https://localhost:7140/api/Computers/' + this.computer.id, this.computer);
  console.log(this.computer.computerName);
}


addConfigToComputer(){

  this.http.post(`https://localhost:7140/api/ComputersConfigsCtr/${this.computer.id}/${this.selectedConfig}`, {}).subscribe(response => {
    console.log('Config added:', response);
  },
  error => {
    console.log('Error:', error)
  })

  this.updateComputerConfigs();

  this.ngOnInit();
}


deleteConfigFromComputer(config: Config): void {
  this.http.delete<ComputersConfigs>(`https://localhost:7140/api/ComputersConfigsCtr/${this.computer.id}/${config.id}`).subscribe(response => {
    console.log('Config added:', response);
  },
  error => {
    console.log('Error:', error)
  })

  const index = this.configs.indexOf(config);
  this.configs.splice(index, 1);

  this.updateComputerConfigs();

}

updateComputerConfigs() {
  this.configService.getConfigsForComputer(this.computer.id).subscribe(computerConfigs => {
    this.configs = this.configs;
  });

}

updateComputerGroups() {
  this.groupService.getGroupsForComputer(this.computer.id).subscribe(computerGroups => {
    this.computerGroups = this.computerGroups;
  });

}

saveChanges(computerName: string, description: string)
{
  this.computer.computerName = computerName;
  this.computer.description = description;
  this.computerService.putComputer(this.computer).subscribe(() => this.router.navigate(['/Computers']))
}

logout() {
  this.sessionsService.logout();
}
}
