import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { DataProvider } from '../provider/data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
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

    private load(): Promise<string> {
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

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id')
    }
}
