export class Job {
    id: number
    title: string
    description: string
    theme: string
    date: string
    duration: number
    karmapoints: number
    owner_id: number
    worker_id: number
    status_id: number

    constructor(id: number, title: string, description: string, theme: string, date: string, duration: number, karmapoints: number, owner_id: number, status_id: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.theme = theme;
        this.date = date;
        this.duration = duration;
        this.karmapoints = karmapoints;
        this.owner_id = owner_id;
        this.status_id = status_id;
    }

    addWorker(worker_id: number){
        this.worker_id = worker_id;
    }
}
