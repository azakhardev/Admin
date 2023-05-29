import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { Computer } from 'src/app/models/computer';
import { ComputersService } from 'src/app/services/computers.service';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-table3',
  templateUrl: './table3.component.html',
  styleUrls: ['./table3.component.scss']
})
export class Table3Component {
  public unauthorizedComputers: Computer[] = [];

  constructor(private computersService: ComputersService){}

  ngOnInit(): void {
    this.unauthorizedComputers = [];
    this.computersService.getComputers().subscribe((computers: Computer[]) => {
      for(const computer of computers){
        if(computer.computerStatus === 'Unauthorized'){
          this.unauthorizedComputers.push(computer);
        }
      }
    })
  }


  setComputerAuthorized(computer: Computer) {
    computer.computerStatus = 'Authorized';
    this.computersService.putComputer(computer).subscribe(
      response => {
        console.log('Počítač byl úspěšně aktualizován.', response);
      },
      error => {
        console.error('Chyba při aktualizaci počítače.', error);
      }
    );

    

    this.ngOnInit();
    
  }

  setComputerBlocked(computer: Computer) {
    computer.computerStatus = 'Blocked'
    console.log(computer);
    this.computersService.putComputer(computer).subscribe(
      response => {
        console.log('Počítač byl úspěšně aktualizován.', response);
      },
      error => {
        console.error('Chyba při aktualizaci počítače.', error);
      }
    );

    this.ngOnInit();

  }

}