import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Job } from '../model/job';
import { Status } from '../model/status';
import { User } from '../model/user';

@Injectable()
export class DataProvider {

    private apiurl: string = 'http://127.0.0.1:8000/api/ajdqrr/'

    public jobs: Job[]
    public statuses: Status[]
    public users: User[]
    public lastUpdateTime: Date
    public lastUpdateSuccess: boolean

    private storage: Storage
    private httpClient: HttpClient

    constructor(storage: Storage, httpClient: HttpClient) {
        this.storage = storage
        this.httpClient = httpClient
        // this.init()
        this.jobs = []
        this.statuses = []
        this.users = []
        this.lastUpdateTime = null
        this.lastUpdateSuccess = false
    }

    public init() { // Initialize storage with hardcoded data
        this.jobs = []
        let j = new Job(1, 'Tondre le gazon', "Mon gazon est trop long et il me faudrait quelqu'un pour le tondre", 'Jardinage', '21/06/2019 14:00', 2.5, 150, 1, 2, 1)
        this.jobs.push(j)
        j = new Job(2, 'Laver la piscine', 'Il y à des cailloux au fond de ma piscine', 'Menage', '30/06/2019 16:00', 4, 200, 4, 2, 3)
        this.jobs.push(j)
        j = new Job(3, 'Réparer ma voiture', "Ma bougie d'allumage à quelques problèmes", 'Réparation', '19/06/2019 16:00', 9, 800, 5, 3, 5)
        this.jobs.push(j)
        j = new Job(4, 'Arroser les plantes', "Je pards en vacances et mes plantes risquent de ne pas supporter tout l'été" , 'Jardinage', '07/07/2019 08:00', 1, 50, 2, 6, 4)
        this.jobs.push(j)
        j = new Job(5, 'Barbecue', "J'ai besoin d'une personne pour s'occuper de la viande lors de notre petite soirée barbecue", 'Cuisine', '23/06/2019 17:00', 7, 400, 5, 1, 2)
        this.jobs.push(j)
        this.storage.set('jobs', this.jobs)

        this.statuses = []
        let s = new Status(1, 'Ouvert')
        this.statuses.push(s)
        s = new Status(2, 'Pris')
        this.statuses.push(s)
        s = new Status(3, 'Accepté')
        this.statuses.push(s)
        s = new Status(4, 'Abandonné')
        this.statuses.push(s)
        s = new Status(5, 'Fait')
        this.statuses.push(s)
        s = new Status(6, 'Validé')
        this.statuses.push(s)
        s = new Status(7, 'Baclé')
        this.statuses.push(s)
        this.storage.set('statuses', this.statuses)

        this.users = []
        let u = new User(1, 'Abel', 'Auboisdormant', 'abcde', 'Rue du four')
        this.users.push(u)
        u = new User(2, 'Beth', 'Rave', '12345', 'Rue du milieu')
        this.users.push(u)
        u = new User(3, 'Clément', 'Tine', 'qwertz', 'Rue de la thièle')
        this.users.push(u)
        u = new User(4, 'Édith', 'Orial', 'azerty', 'Avenue des cygnes')
        this.users.push(u)
        u = new User(5, 'Jacques', 'Xellerre', '1234321', 'Rue de plaisance')
        this.users.push(u)
        u = new User(6, 'Lara', 'Tatouille', 'qwerty', 'Place pestalozzi')
        this.users.push(u)
        this.storage.set('users', this.users)
    }

    //-------------------------------------
    // Load, get and update jobs
    //-------------------------------------
    public loadJobsFromAPI(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.jobs = []
            // this.httpClient.get(this.apiurl + 'jobs').subscribe(
            this.httpClient.get('https://api.myjson.com/bins/kj7fh').subscribe(
                data => { // API is responding, save the datas into jobs
                    this.storage.set('jobs', data).then(() => {
                        this.lastUpdateSuccess = true
                        this.lastUpdateTime = new Date()
                        this.storage.set('lastUpdateTime', this.lastUpdateTime).then(() => {
                            console.log('data from API stored')
                            resolve('Ok')
                        })
                    })
                },
                err => {
                    this.storage.get('lastUpdateTime').then((value) => {
                        this.lastUpdateTime = value
                    })
                    this.lastUpdateSuccess = false
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
                    var j = new Job(value.id, value.title, value.description, value.theme, value.date, value.duration, value.karmapoints, value.owner, value.worker, value.status_id)
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

    //-------------------------------------
    // Load, get and update statuses
    //-------------------------------------
    public loadStatusesFromAPI(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.statuses = []
            this.httpClient.get(this.apiurl + 'statuses').subscribe(
                data => { // API is responding, save the datas into statuses
                    this.storage.set('statuses', data).then(() => {
                        this.lastUpdateSuccess = true
                        this.lastUpdateTime = new Date()
                        this.storage.set('lastUpdateTime', this.lastUpdateTime).then(() => {
                            console.log('data from API stored')
                            resolve('Ok')
                        })
                    })
                },
                err => {
                    this.storage.get('lastUpdateTime').then((value) => {
                        this.lastUpdateTime = value
                    })
                    this.lastUpdateSuccess = false
                    console.log('Load from API failed with error ' + err.message)
                    reject('API call failed')
                }
            )
        })
    }

    // Convert the json format stored in storage to array of Status objects
    public loadStatusesFromStorage(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.statuses = []
            console.log('loadStatusesFromStorage')
            this.storage.get('statuses').then((data) => {
                data.data.forEach((value) => {
                    var s = new Status(value.id, value.name)
                    this.statuses.push(s)
                })
                console.log('LoadStatusesFromStorage.resolve');
                resolve('Ok')
            }).catch(() => {
                console.log('loadStatusesFromStorage.reject');
                reject('Ko')
            })
        })
    }

    public getStatus(id) {
        return new Promise<any>((resolve, reject) => {
            this.statuses.forEach((status) => {
                if (status.id == id) resolve(status)
            })
            reject('Status #' + id + ' not found')
        })
    }

    public updateStatusOnBackend(id): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getStatus(id).then((status) => {
                this.httpClient
                    .put(this.apiurl + 'statuses/' + id, status).subscribe(
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

    //-------------------------------------
    // Load, get and update users
    //-------------------------------------
    public loadUsersFromAPI(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.users = []
            this.httpClient.get(this.apiurl + 'users').subscribe(
                data => { // API is responding, save the datas into users
                    this.storage.set('users', data).then(() => {
                        this.lastUpdateSuccess = true
                        this.lastUpdateTime = new Date()
                        this.storage.set('lastUpdateTime', this.lastUpdateTime).then(() => {
                            console.log('data from API stored')
                            resolve('Ok')
                        })
                    })
                },
                err => {
                    this.storage.get('lastUpdateTime').then((value) => {
                        this.lastUpdateTime = value
                    })
                    this.lastUpdateSuccess = false
                    console.log('Load from API failed with error ' + err.message)
                    reject('API call failed')
                }
            )
        })
    }

    // Convert the json format stored in storage to array of User objects
    public loadUsersFromStorage(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.users = []
            console.log('loadUsersFromStorage')
            this.storage.get('users').then((data) => {
                data.data.forEach((value) => {
                    var u = new User(value.id, value.first_name, value.last_name, value.password, value.address)
                    this.users.push(u)
                })
                console.log('LoadUsersFromStorage.resolve');
                resolve('Ok')
            }).catch(() => {
                console.log('loadUsersFromStorage.reject');
                reject('Ko')
            })
        })
    }

    public getUser(id) {
        return new Promise<any>((resolve, reject) => {
            this.users.forEach((user) => {
                if (user.id == id) resolve(user)
            })
            reject('User #' + id + ' not found')
        })
    }

    public updateUserOnBackend(id): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getUser(id).then((user) => {
                this.httpClient
                    .put(this.apiurl + 'users/' + id, user).subscribe(
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
