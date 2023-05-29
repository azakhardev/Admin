import { Component } from '@angular/core';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  constructor(private sessionsService: SessionsService) {}
  
  logout() {
    this.sessionsService.logout();
  }
}
