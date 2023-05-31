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
  selector: 'app-config-edit',
  templateUrl: './config-edit.component.html',
  styleUrls: ['./config-edit.component.scss']
})
export class ConfigEditComponent implements OnInit {

  configId!: number; // Add the '!' symbol to indicate that it will be initialized later
  sources: Source[] = []; // Initialize sources as an empty array
  destinations: Destination[] = [];
  computers: Computer[] = [];
  source: SourceToPost = new SourceToPost(0,'');
  destination: Destination = new Destination(0,0,'')
  allComputers: Computer[] = [];
  config: Config;

  configName: string = '';
  activeButton = 'Incremental';
  activeFormat = 'Zip';
  newSource: Source = new Source(0, 0, '', '', new Date());
  selectedSources: Source[] = [];

  newDestination: Destination = new Destination(0, 0, '');
  selectedDestinations: Destination[] = [];
  
  amountOfPackages: number;
  packageSize: number;
  activeSchedule: string = '* * * * *';

  constructor(
    private route: ActivatedRoute,
    private sessionsService: SessionsService,
    private configService: ConfigsService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get<Config>('https://localhost:7140/api/Configs/' + this.route.snapshot.paramMap.get('Id'))
    .subscribe(configResult => {
      this.config = configResult;
    this.configId = configResult.id;
    this.configName = configResult.configName;
    console.log(configResult);
    console.log(this.configId);
    this.http.get<Source[]>(`https://localhost:7140/api/Configs/${this.configId}/Sources`)
      .subscribe(sources => {
        this.sources = sources;
        console.log(sources);
      }, error => {
        console.log('Chyba při načítání sources:', error);
      });
      this.http.get<Destination[]>(`https://localhost:7140/api/Configs/${this.configId}/Destinations`)
      .subscribe(destinationResult => {
        this.destinations = destinationResult;
        console.log(destinationResult)
      }, error => {
        console.log('Chyba při načítání destinations:', error);
      });
      this.http.get<Computer[]>(`https://localhost:7140/api/Configs/${this.configId}/Computers`)
      .subscribe(computerResult => {
        this.computers = computerResult;
        console.log(computerResult)
      }, error => {
        console.log('Chyba při načítání computers:', error);
      });  

      this.http.get<Computer[]>('https://localhost:7140/api/Computers').subscribe(x => this.allComputers = x)

      this.packageSize = this.config.maxPackageSize;
      this.amountOfPackages = this.config.maxPackageAmount;

  });
  console.log(this.sources);
  }

  setActiveButton(button: string): void {
    this.activeButton = button;
  }

  setActiveFormat(format: string): void {
    this.activeFormat = format;
  } 

  setSchedule(schedule: string)
  {
    this.config.schedule = schedule;
  }

  logout() {
    this.sessionsService.logout();
  }
  
  addSource(source: string)
  {
    this.source = new SourceToPost(this.configId, source)
    this.configService.postSource(this.source).subscribe(()=>this.ngOnInit())    
    window.location.reload()
  }

  addDestination(destination: string)
  {
    this.destination = new Destination(0,this.configId, destination)
    this.configService.postDestination(this.destination).subscribe(()=>this.ngOnInit())
    window.location.reload()
  }

  deleteSource(id: number)
  {
    this.configService.deleteSource(id).subscribe(()=>this.ngOnInit())
    window.location.reload()
  }

  deleteDestination(id: number)
  {
    this.configService.deleteDestination(id).subscribe(()=>this.ngOnInit())
    window.location.reload()
  }

  submit(name: string, maxPackageAmount: number, maxPackageSize: number, schedule: string)
  {
  this.config.configName = name;
  this.config.maxPackageAmount = maxPackageAmount;
  this.config.maxPackageSize = maxPackageSize;
  this.config.algorithm = this.activeButton;
  this.config.schedule = schedule;

  if(this.activeFormat == 'Zip')
    {this.config.zip = true}
  else
    {this.config.zip = false}

  this.configService.saveChanges(this.config).subscribe(()=> this.router.navigate(['/Configs']))
  }

  public readonly parseInt = parseInt;
}
