import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { DataProvider } from '../provider/data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {
    private router
    private activatedRoute
    private data: DataProvider
    private id: number

    constructor(router: Router, activatedRoute: ActivatedRoute, data: DataProvider) {
        this.router = router
        this.activatedRoute = activatedRoute
        this.data = data
        this.loadUsers()
        this.loadJob()
    }

    private loadUsers(): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            this.data.loadUsersFromAPI().then(() => {
                this.data.loadUsersFromStorage().then(() => {
                    console.log('load.resolve')
                    resolve('Ok')
                })
            }).catch(() => {
                this.data.loadUsersFromStorage()
                console.log('load.reject')
                reject('Ko')
            })
        })
    }

    private loadJob(): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            this.data.getJob(this.activatedRoute.snapshot.paramMap.get('id')).then(() => {
                console.log('load.resolve')
                resolve('Ok')
            }).catch(() => {
                console.log('load.reject')
                reject('Ko')
            })
        })
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id')
    }
}
