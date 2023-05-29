export class Report {

    public id: number;
    public date: Date;
    public errors: string;
    public message: string;
    public computersConfigsId: number;
    public computerId: number;
    public configId: number;
    public computerName: string;
    public configName: string;

    public constructor(id:number, date:Date, errors: string, message: string, computersConfigsId: number, computerId: number, configId: number, computerName: string, configName: string){
        this.id = id;
        this.date = date;
        this.errors = errors
        this.message = message;
        this.computersConfigsId = computersConfigsId;
        this.computerId = computerId;
        this.configId = configId;
        this.computerName = computerName;
        this.configName = configName;

    }
}