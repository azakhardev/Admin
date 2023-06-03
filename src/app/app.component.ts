import { Component } from '@angular/core';
import { SessionsService } from './services/sessions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AdminApp';
  username = sessionStorage.getItem('username');
  constructor(private sessionsService: SessionsService){}
  logout() {
    this.sessionsService.logout();
  }

  public isAuthenticated(): boolean {
    return this.sessionsService.isAuthenticated();
  }
}



/**/ 