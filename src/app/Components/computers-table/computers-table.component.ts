import { Component } from '@angular/core';
import { ComputersService } from 'src/app/services/computers.service';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Computer } from 'src/app/models/computer';

@Component({
  selector: 'app-computers-table',
  templateUrl: './computers-table.component.html',
  styleUrls: ['./computers-table.component.scss']
})
export class ComputersTableComponent {
  public computer: Computer[] = [];
  constructor(private computersService: ComputersService, private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.http.get<Computer[]>('https://localhost:7140/api/Computers').subscribe(result =>{
      this.computer = result;
      console.log(this.computer);
    });
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
}
