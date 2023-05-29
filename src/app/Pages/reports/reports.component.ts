import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Computer } from 'src/app/models/computer';
import { Report } from 'src/app/models/report';
import { ComputersService } from 'src/app/services/computers.service';
import { ReportsService } from 'src/app/services/reports.service';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit{

  reports: Report[] = [];
  report: Report
  computers: Computer[] = [];

  name: string = ''

  constructor( private sessionsService: SessionsService, private reportsService: ReportsService, private computerService: ComputersService) {
    this.report = {} as Report;
   }
  logout() {
    this.sessionsService.logout();
  }

  ngOnInit(): void {   
    this.reportsService.getReports().subscribe((reports: Report[]) => {
      this.reports = reports;
    });
    
  }

  public getComputerName(id: number): string{
    // this.computerService.getComputerNameById(id).subscribe(result => this.computer = result);
    // return this.computer.computerName

    this.computerService.getComputerNameById(id).subscribe(data => {
      this.name = data
    });
    return this.name;
  }
}
