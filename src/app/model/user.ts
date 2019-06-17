export class User {
    public id: number
    public first_name: string
    public last_name: string
    public password: string
    public address: string

    constructor(id: number, first_name: string, last_name: string, password: string, address: string) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.address = address;
    }
}
