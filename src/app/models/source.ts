export class Source
{
    public id: number;
    public configID: number;
    public sourcePath: string;
    public fileName: string;
    public updateDate: Date;

    public constructor(id: number, configID: number, sourcePath: string, fileName: string, updateDate: Date){
        this.id = id;
        this.configID = configID;
        this.sourcePath = sourcePath;
        this.fileName = fileName;
        this.updateDate = updateDate      
    }
}