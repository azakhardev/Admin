export class Computer {

    public id: number;
    public computerName: string;
    public computerStatus: string;
    public description: string;
    public lastBackup: Date;
    public backupStatus: string;

    public constructor(id: number, computerName: string,computerStatus: string, description: string, lastBackup: Date, backupStatus: string){
        this.id = id;
        this.computerName = computerName;
        this.computerStatus = computerStatus;
        this.description = description;
        this.lastBackup = lastBackup;
        this.backupStatus = backupStatus;
    }
}
