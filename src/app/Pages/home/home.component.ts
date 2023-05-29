import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  

  constructor(private http: HttpClient, private router:Router,private sessionsService: SessionsService){}

  ngOnInit(): void {
    
  }
}
