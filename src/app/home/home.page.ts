import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { DataProvider } from '../provider/data';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    private router
    private data: DataProvider
    private storage: Storage

    constructor(router: Router, storage: Storage, data: DataProvider) {
        this.router = router
        this.storage = storage
        this.data = data
        this.load()
    }

    private load(): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            this.data.getCurrentUser().then(() => {
                this.data.getUser(this.data.currentUser).then(() => {
                    console.log('load.resolve')
                    resolve('Ok')
                })
            }).catch(() => {
                console.log('load.reject')
                reject('Ko')
            })
        })
    }

    showMyJobs(id) {
        this.router.navigateByUrl('/my-jobs/' + id)
    }

    showTheirJobs(id) {
        this.router.navigateByUrl('/their-jobs/' + id)
    }

    showFreeJobs(id) {
        this.router.navigateByUrl('/free-jobs/' + id)
    }

}
