import { Component } from '@angular/core';
import { Report } from 'src/app/models/report';
import { ComputersService } from 'src/app/services/computers.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.scss']
})
export class Table1Component {
  
  public reports: Report[] = [];
  public completedReports: Report[] = [];

  constructor(private computersService: ComputersService, private reportsService: ReportsService){}

  ngOnInit(): void{
    this.reportsService.getReports().subscribe((reports: Report[]) => {
      for(const report of reports){
        if(report.errors === 'No'){
          this.completedReports.push(report);
        }
      }
    })
  }
}
