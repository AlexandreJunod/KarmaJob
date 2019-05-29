import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../providers/data';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    public data: DataProvider

    constructor(private storage: Storage) {
        this.data = new DataProvider(storage)
        console.log(this.data)
    }
}
