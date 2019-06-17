import { Job } from '../model/job';
import { Storage } from '@ionic/storage'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataProvider {

    private apiurl: string = 'http://127.0.0.1:8000/api/ajdqrr/'

    public jobs: Job[]
    public jobsLastUpdateTime: Date
    public jobsLastUpdateSuccess: boolean

    private storage: Storage
    private httpClient: HttpClient

    constructor(storage: Storage, httpClient: HttpClient) {
        this.storage = storage
        this.httpClient = httpClient
        // this.init()
        this.jobs = []
        this.jobsLastUpdateTime = null
        this.jobsLastUpdateSuccess = false
    }

    public loadJobsFromAPI(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.jobs = []
            this.httpClient.get(this.apiurl + 'jobs').subscribe(
                data => { // API is responding, save the datas into jobs
                    this.storage.set('jobs', data).then(() => {
                        this.jobsLastUpdateSuccess = true
                        this.jobsLastUpdateTime = new Date()
                        this.storage.set('lastUpdateTime', this.jobsLastUpdateTime).then(() => {
                            console.log('data from API stored')
                            resolve('Ok')
                        })
                    })
                },
                err => {
                    this.storage.get('lastUpdateTime').then((value) => {
                        this.jobsLastUpdateTime = value
                    })
                    this.jobsLastUpdateSuccess = false
                    console.log('Load from API failed with error ' + err.message)
                    reject('API call failed')
                }
            )
        })
    }

    // Convert the json format stored in storage to array of Job objects
    public loadJobsFromStorage(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.jobs = []
            console.log('loadJobsFromStorage')
            this.storage.get('jobs').then((data) => {
                data.data.forEach((value) => {
                    var j = new Job(value.id, value.title, value.description, value.theme, value.date, value.karmapoints, value.owner, value.worker, value.status_id)
                    this.jobs.push(j)
                })
                console.log('LoadJobsFromStorage.resolve');
                resolve('Ok')
            }).catch(() => {
                console.log('loadJobsFromStorage.reject');
                reject('Ko')
            })
        })
    }

    public init() { // Initialize storage with hardcoded data
        this.jobs = []
        let j = new Job(1, 'Tondre le gazon', "Mon gazon est trop long et il me faudrait quelqu'un pour le tondre", 'Jardinage', '29/05/2019 14:00', 2.5, 150, 1, 2)
        this.jobs.push(j)

        j = new Job(2, 'Laver la piscine', 'Il y à des cailloux au fond de ma piscine', 'Menage', '31/05/2019 16:00', 2.5, 150, 2, 1)
        this.jobs.push(j)

        this.storage.set('jobs', this.jobs)
    }

    public getJob(id) {
        return new Promise<any>((resolve, reject) => {
            this.jobs.forEach((job) => {
                if (job.id == id) resolve(job)
            })
            reject('Job #' + id + ' not found')
        })
    }

    public updateJobOnBackend(id): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getJob(id).then((job) => {
                this.httpClient
                    .put(this.apiurl + 'jobs/' + id, job).subscribe(
                    data => {
                        resolve('Ok')
                    },
                    err => {
                        reject('API call failed')
                    }
                )
            })
        })
    }
}
