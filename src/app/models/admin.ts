 export class Admin
{
    public id: number;
    public username: string;
    public password: string;
    public description: string;
    public email: string;
    public active: boolean;
    public schedule?: string;

    public constructor(id: number, username: string, password:string, description: string, email: string, active: boolean, schedule: string){
        this.id = id;
        this.username = username;
        this.password = password;
        this.description = description;
        this.email = email;
        this.active = active;
        this.schedule = schedule;
    }
}