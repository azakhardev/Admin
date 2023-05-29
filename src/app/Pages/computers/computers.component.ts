import { Component, OnInit } from '@angular/core';
import { ComputersService } from 'src/app/services/computers.service';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Computer } from 'src/app/models/computer';
import { SessionsService } from 'src/app/services/sessions.service';
import { Group } from 'src/app/models/group';
import { Config } from 'src/app/models/config';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss'],
  providers: [ComputersService]
})

export class ComputersComponent implements OnInit{
  public computer: Computer[] = [];
  groups: Group[];
  configs: Config[];

  constructor(private computersService: ComputersService, private http: HttpClient, private router: Router,private sessionsService: SessionsService){}

  ngOnInit(): void {
    this.computersService.getComputers().subscribe((computers: Computer[]) => {
      for(const computer of computers){
        if(computer.computerStatus !== 'Unauthorized'){
          this.computer.push(computer);
        }        
      }
    })
  
}

goToComputerDetail(computer: Computer) {
  if (computer && computer.computerName) {
    this.router.navigate(['/Computers', computer.computerName], { state: { id: computer.id } });
  } else {
    console.error('Invalid computer data:', computer);
  }
}

public delete(computer: Computer): void {
  this.computersService.deleteComputer(computer.id).subscribe(() => {
    this.computer = this.computer.filter(c => c.id !== computer.id); 
  });
}

logout() {
  this.sessionsService.logout();
}
}
