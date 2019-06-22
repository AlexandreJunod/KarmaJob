import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { DataProvider } from '../provider/data';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    private router
    private activatedRoute
    private data: DataProvider
    private userid: number
    private storage: Storage


    constructor(router: Router, activatedRoute: ActivatedRoute, data: DataProvider, storage: Storage) {
        this.router = router
        this.activatedRoute = activatedRoute
        this.storage = storage
        this.data = data
        this.load()
    }

    loginUser()
    {
        //User has selected an user ? Or he pressed "valider" without user
        if(this.userid)
        {
            this.storage.set('currentUser', this.userid)
            this.router.navigateByUrl('/home')
        }
    }

    private load(): Promise<string> {
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
