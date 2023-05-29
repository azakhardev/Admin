export class Destination
{
    public id: number;
    public configId: number;
    public destinationPath: string;

    public constructor(id: number, configId: number, destinationPath: string){
        this.id = id;
        this.configId = configId;
        this.destinationPath = destinationPath
    }
}