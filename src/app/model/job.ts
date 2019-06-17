export class Job {
    id: number
    title: string
    description: string
    theme: string
    date: string
    duration: number
    karmapoints: number
    owner: number
    worker: number
    status_id: number

    constructor(id: number, title: string, description: string, theme: string, date: string, duration: number, karmapoints: number, owner: number, status_id: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.theme = theme;
        this.date = date;
        this.duration = duration;
        this.karmapoints = karmapoints;
        this.owner = owner;
        this.status_id = status_id;
    }

    add_worker(worker: number){
        this.worker = worker;
    }
}
