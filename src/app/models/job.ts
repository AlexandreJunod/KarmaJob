class Job {
    id: number
    title: string
    description: string
    occurence: date
    debt: number
    owner: number
    worker: number
    status_id: number

    constructor(id: number, title: string, description: string, occurence: date, debt: number, owner: number, status_id: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.occurence = occurence;
        this.debt = debt;
        this.owner = owner;
        this.status_id = status_id;
        this.id = id;
    }

    add_worker(worker: number){
        this.worker = worker;
    }
}
