export class ComputersConfigs
{
    public id: number | null;
    public computerId: number;
    public configId: number;
    public snapshot: string;


    public constructor(computerId: number, configId: number, snapshot: string, id: number | null = null){
        this.id = id;
        this.computerId = computerId;
        this.configId = configId;
        this.snapshot = snapshot;
    }
}