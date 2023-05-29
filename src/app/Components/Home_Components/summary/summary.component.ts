import { Component } from '@angular/core';
import { Report } from 'src/app/models/report';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  public reports: Report[] = [];
  public completedReports: Report[] = [];
  public failedReports: Report[] = [];

  constructor(private reportsService: ReportsService){}

  ngOnInit(): void{
    this.reportsService.getReports().subscribe((reports: Report[]) => {
      for(const report of reports){
        if(report.errors === 'No'){
          this.completedReports.push(report);
        }
      }
    });

    this.reports = [];

    this.reportsService.getReports().subscribe((reports: Report[]) => {
      for(const report of reports){
        if(report.errors === 'Yes'){
          this.failedReports.push(report);
        }
      }
    });

    
}
}
