import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { DataProvider } from '../provider/data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
    private router
    private activatedRoute
    private data: DataProvider

    constructor(router: Router, activatedRoute: ActivatedRoute, data: DataProvider) {
        this.router = router
        this.activatedRoute = activatedRoute
        this.data = data
        this.load()
    }

    showDetailsOfUser(id) {
        this.router.navigateByUrl('/user-details/' + id)
    }

    private load(): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            this.data.loadUsersFromAPI().then(() => {
                this.data.loadUsersFromStorage().then((jobs) => {
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
