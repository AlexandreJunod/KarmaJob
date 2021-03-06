import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { DataProvider } from '../provider/data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
    private router
    private activatedRoute
    private data: DataProvider
    private id: number

    constructor(router: Router, activatedRoute: ActivatedRoute, data: DataProvider) {
        this.router = router
        this.activatedRoute = activatedRoute
        this.data = data
        this.loadJobs()
        this.loadUser()
    }

    private loadJobs(): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            this.data.loadJobsFromAPI().then(() => {
                this.data.loadJobsFromStorage().then(() => {
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

    private loadUser(): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            this.data.getUser(this.activatedRoute.snapshot.paramMap.get('id')).then(() => {
                console.log('load.resolve')
                resolve('Ok')
            }).catch(() => {
                console.log('load.reject')
                reject('Ko')
            })
        })
    }

    showDetailsOfJob(id) {
        this.router.navigateByUrl('/job-details/' + id)
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id')
    }
}
