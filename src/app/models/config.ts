import { Source } from "./source";

export class Config {

    public id: number;
    public configName: string;
    public creationDate: Date;
    public algorithm: string;
    public schedule: string;
    public zip: boolean;
    public maxPackageAmount: number;
    public maxPackageSize: number;
    //public sources: Source[]|null;

    public constructor(id:number, configName: string,creationDate:Date, algorithm:string, schedule:string,zip: boolean, maxPackageAmount: number, maxPackageSize: number, sources: Source[]|null){
        this.id = id;
        this.configName = configName;
        this.creationDate = creationDate;
        this.algorithm = algorithm;
        this.schedule = schedule;
        this.zip = zip;
        this.maxPackageAmount = maxPackageAmount;
        this.maxPackageSize = maxPackageSize;
        //this.sources = sources;

    }
}
