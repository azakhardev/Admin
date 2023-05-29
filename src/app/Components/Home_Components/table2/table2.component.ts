import { Component } from '@angular/core';
import { Report } from 'src/app/models/report';
import { ComputersService } from 'src/app/services/computers.service';
import { ConfigsService } from 'src/app/services/configs.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-table2',
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.scss']
})
export class Table2Component {

  public reports: Report[] = [];
  public failedReports: Report[] = [];

  constructor(private computersService: ComputersService, private configsService: ConfigsService, private reportsService: ReportsService){}

  ngOnInit(): void{
    this.reportsService.getReports().subscribe((reports: Report[]) => {
      for(const report of reports){
        if(report.errors === 'Yes'){
          this.failedReports.push(report);
        }
      }
    })
  }
}
