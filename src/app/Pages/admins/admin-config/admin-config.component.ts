import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Admin } from 'src/app/models/admin';
import { AdminsService } from 'src/app/services/admins.service';
import { HttpHeaders } from '@angular/common/http';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.scss'],
  providers: [AdminsService]
})
export class AdminConfigComponent implements OnInit {
  admin: Admin;

  constructor(private route: ActivatedRoute,private http: HttpClient,private adminsService: AdminsService,private router: Router,private sessionsService: SessionsService) 
  {}

  ngOnInit(): void {
    this.http.get<Admin>('https://localhost:7140/api/Admins/' + this.route.snapshot.paramMap.get('Id')).subscribe(adminResult =>
      this.admin = adminResult
    )
  }
  
  setSchedule(schedule: string)
  {
    this.admin.schedule = schedule;
  }

  saveAdmin(password: string, description: string, username: string, email :string): void {
    this.admin.password = password;
    this.admin.description = description;
    this.admin.username = username;
    this.admin.email = email;

    this.adminsService.updateAdmin(this.admin).subscribe(() => this.router.navigate([ '/Admins' ]));
  }

  refresh()
  {
    window.location.reload();
  }

  logout() {
    this.sessionsService.logout();
  }
}