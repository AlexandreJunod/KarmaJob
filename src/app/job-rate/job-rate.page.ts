import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { DataProvider } from '../provider/data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-job-rate',
  templateUrl: './job-rate.page.html',
  styleUrls: ['./job-rate.page.scss'],
})
export class JobRatePage implements OnInit {
    private router
    private activatedRoute
    private data: DataProvider
    private id: number
    private speed_of_work: number
    private quality_of_work: number
    private kidness_of_worker: number

    constructor(router: Router, activatedRoute: ActivatedRoute, data: DataProvider) {
        this.router = router
        this.activatedRoute = activatedRoute
        this.data = data
    }

    sendRate(){
        this.data.rateJob(this.id, this.speed_of_work, this.quality_of_work, this.kidness_of_worker)
        this.router.navigateByUrl('home')
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id')
    }
}
