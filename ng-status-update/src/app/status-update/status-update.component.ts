import { Component, OnInit } from '@angular/core';
import { StatusUpdate } from '../models/status-update';
@Component({
    selector: 'ng-status-update',
    templateUrl: './status-update.component.html',
    styleUrls: ['./status-update.component.scss'],
})
export class StatusUpdateComponent implements OnInit {
    statusUpdates: StatusUpdate[] = [];

    ngOnInit() {
        this.getAllUpdates();
    }
    

    getAllUpdates() {}
}
