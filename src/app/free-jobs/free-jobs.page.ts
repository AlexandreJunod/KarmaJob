import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { DataProvider } from '../provider/data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-free-jobs',
  templateUrl: './free-jobs.page.html',
  styleUrls: ['./free-jobs.page.scss'],
})
export class FreeJobsPage implements OnInit {
    private router
    private activatedRoute
    private data: DataProvider

    constructor(router: Router, activatedRoute: ActivatedRoute, data: DataProvider) {
        this.router = router
        this.activatedRoute = activatedRoute
        this.data = data
        this.loadJobs()
        this.loadUsers()
    }

    showDetailsOfJob(id) {
        this.router.navigateByUrl('/job-details/' + id)
    }

    private loadJobs(): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            this.data.loadJobsFromAPI().then(() => {
                this.data.loadJobsFromStorage().then((jobs) => {
                    console.log('load.resolve')
                    resolve('Ok')
                })
            }).catch(() => {
                this.data.loadJobsFromStorage()
                console.log('load.reject')
                reject('Ko')
            })
        })
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

    ngOnInit() {
    }
}
