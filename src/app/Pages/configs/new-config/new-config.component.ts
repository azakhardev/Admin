import { Component, Input, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/services/sessions.service';
import { Source } from 'src/app/models/source';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { Config } from 'src/app/models/config';
import { Destination } from 'src/app/models/destination';
import { Computer } from 'src/app/models/computer';
import { SourceToPost } from 'src/app/models/source-to-post';
import { ConfigsService } from 'src/app/services/configs.service';

@Component({
  selector: 'app-new-config',
  templateUrl: './new-config.component.html',
  styleUrls: ['./new-config.component.scss']
})

export class NewConfigComponent implements OnInit {
  config: Config;
  sources: Source[] = [];  
  destinations: Destination[] = [];
  computers: Computer[] = [];
  
  source: SourceToPost = new SourceToPost(0,'');
  destination: Destination = new Destination(0,0,'')
  allComputers: Computer[] = [];
   
  constructor(
    private route: ActivatedRoute,
    private sessionsService: SessionsService,
    private configService: ConfigsService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.config = new Config(0,'New_Config',new Date(),'Full','* * * * *',false,1,1,[])
   this.http.get<Computer[]>('https://localhost:7140/api/Computers').subscribe(x => this.allComputers = x);
   this.http.get<number>('https://localhost:7140/api/Configs/LastCofnig').subscribe(x => this.config.id = x+1)
  
  }

  setActiveAlgorithm(button: string): void {
    this.config.algorithm = button;
  }

  setActiveFormat(format: boolean): void {
    this.config.zip = format;
  } 

  logout() {
    this.sessionsService.logout();
  }
  
  addSourceToList(source: string)
  {
    this.source = new SourceToPost(this.config.id, source)
    this.sources.push(new Source(0,this.config.id,source,'',new Date()))
    //this.configService.postSource(this.source).subscribe(()=>this.ngOnInit())    
  }

  addDestinationToList(destination: string)
  {
    this.destination = new Destination(0,this.config.id, destination)
    this.destinations.push(new Destination(0,this.config.id,destination))
    //this.configService.postDestination(this.destination).subscribe(()=>this.ngOnInit())
  }

  deleteSource(id: number)
  {
    this.configService.deleteSource(id).subscribe(()=>this.ngOnInit())
  }

  deleteDestination(id: number)
  {
    this.configService.deleteDestination(id).subscribe(()=>this.ngOnInit())
  }

  setSchedule(schedule: string)
  {
    this.config.schedule = schedule;
  }

  /*
  addComputerToConfig(computer: Computer)
  {
    return this.configService.addComputer(computer.id,this.config.id)
  }

  deleteComputerFromConfig(id: number)
  {
    return this.configService.deleteComputer(id,this.config.id)
  }
  */
  submit(name: string, maxPackageAmount: number, maxPackageSize: number)
  {
    this.config.configName = name;
    this.config.maxPackageAmount = maxPackageAmount;
    this.config.maxPackageSize = maxPackageSize;
    
    this.configService.postConfig(this.config).subscribe(x => {this.pushSourcesDestinations()})   

    this.router.navigate(['/Configs'])
  }

  pushSourcesDestinations()
  {
    this.sources.forEach((source: Source) => 
    {
    this.configService.postSource(new SourceToPost(source.configID,source.sourcePath)).subscribe( result =>
      console.log(result)
    );
    })

    this.destinations.forEach((destination: Destination) => 
    {
    this.configService.postDestination(destination).subscribe( result =>
      console.log(result)
    );
    })  
 
  }

  public readonly parseInt = parseInt;
}
