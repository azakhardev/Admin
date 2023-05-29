import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit{

  constructor(private sessionsService: SessionsService) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.sessionsService.logout();
  }
}
