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
    private currentUser : number

    constructor(router: Router, storage: Storage, data: DataProvider) {
        this.router = router
        this.storage = storage
        this.data = data
        // this.currentUser = []
        this.load()
    }

    private load(): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            this.storage.get('currentUser').then((current_user) => {
                this.currentUser = current_user
                this.data.getUser(current_user).then(() => {
                    console.log('load.resolve')
                    resolve('Ok')

                })
            }).catch(() => {
                console.log('load.reject')
                reject('Ko')
            })
        })
    }
}
