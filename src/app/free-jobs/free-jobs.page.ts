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
    private id: number

    constructor(router: Router, activatedRoute: ActivatedRoute, data: DataProvider) {
        this.router = router
        this.activatedRoute = activatedRoute
        this.data = data
        this.load()
    }

    showDetailsOfJob(id) {
        this.router.navigateByUrl('/job-details/' + id)
    }

    private load(): Promise<string> {
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

    ngOnInit() {
        this.id = +this.activatedRoute.snapshot.paramMap.get('id')
    }
    }
