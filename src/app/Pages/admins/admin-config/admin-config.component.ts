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
  id: number;
  username: string;
  password: string;
  email: string;
  description: string;
  admin: Admin;

  constructor(private route: ActivatedRoute,private http: HttpClient,private adminsService: AdminsService,private router: Router,private sessionsService: SessionsService) {
    this.id = 0;
    this.username = '';
    this.password = '';
    this.email = '';
    this.description = '';

    this.admin = {} as Admin;
  }

  ngOnInit(): void {
    //this.route.params.subscribe(params => {
      //this.username = params['username'];
      //this.password = params['password'];
      //this.email = params['email'];
      //this.description = params['description'];
    //});
    this.http.get<Admin>('https://localhost:7140/api/Admins/' + this.route.snapshot.paramMap.get('Id')).subscribe(adminResult =>{
      this.admin = adminResult;
      this.username = this.admin.username;
      this.password = this.admin.password;
      this.email = this.admin.email;
      this.description = this.admin.description;
      this.id = parseInt(this.route.snapshot.paramMap.get('Id')!, 10);
    })
  }

  public saveAdmin(values: any, password: string): void {
    /*this.user.name = values.name;
    this.user.surname = values.surname;
    this.user.email = values.email;*/
    this.admin.password = password;

    Object.assign(this.admin, values);
    this.adminsService.updateAdmin(this.admin).subscribe(() => this.router.navigate([ '/Admins' ]));
  }

  logout() {
    this.sessionsService.logout();
  }
}