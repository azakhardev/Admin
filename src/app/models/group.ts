export class Group {

    public id: number;
    public groupName: string;
    public description: string;
    public lastBackup: Date;
    public backupStatus: string;

    public constructor(id:number, groupName: string, description: string, lastBackup: Date, backupStatus: string){
        this.id = id;
        this.groupName = groupName;
        this.description = description;
        this.lastBackup = lastBackup;
        this.backupStatus = backupStatus;
    }
}
