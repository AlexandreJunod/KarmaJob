import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user';
import { Status } from '../models/status';
import { Job } from '../models/job';
import { reject } from 'q';

export class DataProvider {

    public user: User
    public users: User[]
    public status: Status
    public statuses: Status[]
    public job: Job
    public jobs: Job[]

    constructor(private storage: Storage) {
        this.storage = storage
        this.ngOnInit(storage)
        this.load()
    }


    // Set and get for Users
    public setUser(user) {
        return new Promise((resolve, reject) => {
            this.getUsers().then((users) => {
                if (users == null) {
                    users = [user]
                    resolve (this.storage.set('users', users))
                }
                else {
                    users.push(user)
                    resolve (this.storage.set('users', users))
                }
            })
        }).catch( err => {
            console.log(err)
            reject(err)
        })
    }

    public getUser(user) {

    }

    public getUsers() {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.get('users').then((data) =>{
                    this.users = data
                    console.log(this.users)
                    resolve(this.users)
                })
            })
        }).catch( err => {
            console.log(err)
            reject(err)
        })
    }

    // Set and get for statuses
    public setStatus(status) {
        return new Promise((resolve, reject) => {
            this.getStatuses().then((statuses) => {
                if (statuses == null) {
                    statuses = [status]
                    resolve (this.storage.set('statuses', statuses))
                }
                else {
                    statuses.push(status)
                    resolve (this.storage.set('statuses', statuses))
                }
            })
        }).catch( err => {
            console.log(err)
            reject(err)
        })
    }

    public getStatus(status) {

    }

    public getStatuses() {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.get('statuses').then((data) =>{
                    this.statuses = data
                    resolve(this.statuses)
                })
            })
        }).catch( err => {
            console.log(err)
            reject(err)
        })
    }

    // Set and get for jobs
    public setJob(job) {
        return new Promise((resolve, reject) => {
            this.getJobs().then((jobs) => {
                if (jobs == null) {
                    jobs = [job]
                    resolve (this.storage.set('jobs', jobs))
                }
                else {
                    jobs.push(job)
                    resolve (this.storage.set('jobs', jobs))
                }
            })
        }).catch( err => {
            console.log(err)
            reject(err)
        })
    }

    public getJob(Job) {
    }

    public getJobs() {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.get('jobs').then((data) =>{
                    this.jobs = data
                    resolve(this.jobs)
                })
            })
        }).catch( err => {
            console.log(err)
            reject(err)
        })
    }

    ngOnInit(storage) {
        this.setUser(new User(1, 'Alexandre', 'Junod', '1234', 'Maison'))
        this.setUser(new User(2, 'Tom', 'Sawyer', '1234', 'Cabane'))
        this.setStatus(new Status(1, 'Ouvert'))
        this.setStatus(new Status(2, 'Fermé'))
        this.setJob(new Job(1, 'Tondre le gazon', "Mon gazon est trop long et il me faudrait quelqu'un pour le tondre", 'Jardinage', '29/05/2019 14:00', 2.5, 150, 1, 2))
        this.setJob(new Job(2, 'Laver la piscine', 'Il y à des cailloux au fond de ma piscine', 'Menage', '31/05/2019 16:00', 2.5, 150, 2, 1))
    }

    public load() {
        this.getUsers()
        this.getStatuses()
        this.getJobs()
    }
}
