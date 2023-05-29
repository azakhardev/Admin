export class ComputersGroups
{
    public id: number | null;
    public computerId: number;
    public groupId: number;


    public constructor(computerId: number, groupId: number, id: number | null = null){
        this.id = id;
        this.computerId = computerId;
        this.groupId = groupId;
    }
}