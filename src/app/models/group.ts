export class Group {

    public id: number;
    public groupName: string;
    public description: string;

    public constructor(id:number, groupName: string, description: string){
        this.id = id;
        this.groupName = groupName;
        this.description = description;

    }
}
