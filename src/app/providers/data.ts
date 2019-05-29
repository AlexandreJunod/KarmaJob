import { Storage } from '@ionic/storage';
import { User } from '../models/user';
import { Status } from '../models/status';
import { Job } from '../models/job';

export class DataProvider {

    public user: User
    public status: Status
    public job: Job

    init() {
        this.user = new User(1, 'Alexandre', 'Junod', '1234', 'Maison')
        this.storage.ready().then( () => {
            this.storage.set('users', this.user).then( () => {
                    console.log('User data saved to the db')
            })
        })

        this.user = new User(2, 'Tom', 'Sawyer', '1234', 'Cabane')
        this.storage.ready().then( () => {
            this.storage.set('users', this.user).then( () => {
                console.log('User data saved to the db')
            })
        })

        this.status = new Status(1, 'Ouvert')
        this.storage.ready().then( () => {
            this.storage.set('statuses', this.status).then( () => {
                console.log('Status data saved to the db')
            })
        })

        this.status = new Status(2, 'Fermé')
        this.storage.ready().then( () => {
            this.storage.set('statuses', this.status).then( () => {
                console.log('Status data saved to the db')
            })
        })

        this.job = new Job(1, 'Tondre le gazon', "Mon gazon est trop long et il me faudrait quelqu'un pour le tondre", 'Jardinage', '29/05/2019 14:00', 2.5, 150, 1, 2)
        this.job.add_worker(2)
        this.storage.ready().then( () => {
            this.storage.set('jobs', this.job).then( () => {
                console.log('Job data saved to the db')
            })
        })

        this.job = new Job(2, 'Laver la piscine', 'Il y à des cailloux au fond de ma piscine', 'Menage', '31/05/2019 16:00', 2.5, 150, 2, 1)
        this.job.add_worker(1)
        this.storage.ready().then( () => {
            this.storage.set('jobs', this.job).then( () => {
                console.log('Job data saved to the db')
            })
        })
    }


    constructor(private storage: Storage) {
        // this.init();
        this.storage = storage;

        this.storage.ready().then(() => {
            this.storage.get('jobs').then((data) =>{
                this.job = data
            })
        })

        this.storage.ready().then(() => {
            this.storage.get('statuses').then((data) =>{
                this.status = data
            })
        })

        this.storage.ready().then(() => {
            this.storage.get('users').then((data) =>{
                this.user = data;
            })
        })
    }
}
