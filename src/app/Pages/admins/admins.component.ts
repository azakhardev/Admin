import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/services/admins.service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Admin } from 'src/app/models/admin';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  providers: [AdminsService]
})
export class AdminsComponent implements OnInit {
  public admin: Admin[] = [];
  adminName: string = '';
  adminEmail: string = '';
  adminPassword: string = '';

  constructor(private adminsService: AdminsService, private router: Router, private httpClient: HttpClient,private sessionsService: SessionsService) { }

  ngOnInit(): void {
    this.adminsService.getAdmins().subscribe(result => {
      this.admin = result;
      console.log(this.admin);
    });
  }

  // Metoda pro navigaci na stránku admin-config.component.html s parametrem username
  goToAdminDetail(username: string, password: string, email: string, description: string) {
    this.router.navigate([username, password, email, description]);
  }

  public delete(admin: Admin): void {
    this.adminsService.deleteAdmin(admin.id).subscribe(() => {
      this.adminsService.getAdmins().subscribe(result => {
        this.admin = result;
      });
    });
  }

  addAdmin() {
    const newAdmin: Admin = {
      id: 0,
      username: this.adminName,
      email: this.adminEmail,
      password: this.adminPassword,
      description: "",
      active: false,
      schedule: "11111" 
    };
    
    this.adminsService.addAdmin(newAdmin).subscribe(
      response => {
        console.log(response);
                
        this.adminsService.getAdmins().subscribe(result => {
          this.admin = result;
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  
  logout() {
    this.sessionsService.logout();
  }
  
}
