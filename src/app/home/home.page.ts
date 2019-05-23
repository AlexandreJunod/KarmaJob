import { Component } from '@angular/core';
import { DataProvider } from '../../providers/data';
import { User } from '../model/user';
import { Status } from '../model/status';
import { Job } from '../model/job';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    public obj: User
    public obj: Status
    public obj: Job
}
