import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/services/groups.service';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Group } from 'src/app/models/group';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [GroupsService]
})
export class GroupsComponent implements OnInit{
  public group: Group[] = [];

  constructor(private groupsService: GroupsService,private http: HttpClient, private router:Router,private sessionsService: SessionsService){}

  ngOnInit(): void {
    this.http.get<Group[]>('https://localhost:7140/api/Groups').subscribe(result =>{
      this.group = result;
      console.log(this.group);
    }) 
  }
  goToGroupDetail(groupName: string){
    this.router.navigate([groupName])
  };

  public delete(group: Group): void {
    this.groupsService.deleteConfig(group.id).subscribe(() => {
      this.group = this.group.filter(c => c.id !== group.id); 
    });
  }

  logout() {
    this.sessionsService.logout();
  }
}

