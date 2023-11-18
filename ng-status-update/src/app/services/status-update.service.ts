import { Injectable } from '@angular/core';
import axios from 'axios';
import { StatusUpdate } from '../models/status-update';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class StatusUpdateService {
    private apiUrl = 'http://localhost:3000/status-updates';

    constructor() {}

    getAllStatus(): Observable<StatusUpdate> {
        return new Observable<StatusUpdate>((observer) => {
            axios.get<StatusUpdate>(this.apiUrl)
                .then((response) => {
                    observer.next(response.data);
                     observer.complete();
                }).catch((error) => {
                    observer.error(error);
                })
        });
    }
    getSingleStatus(statusId: number): Observable<StatusUpdate> {
        const url = `${this.apiUrl}/${statusId}`;

        return new Observable<StatusUpdate>((observer) => {
            axios.get<StatusUpdate>(url)
                .then((response) => {
                    observer.next(response.data);
                    observer.complete();
                }).catch((err) => {
                    observer.error(err);
                });
        })
    }
    update(statusId: number, updatedStatus: StatusUpdate) {
        const url = `${this.apiUrl}/${statusId}`;
        return new Observable<StatusUpdate>((observer) => {
            axios.put<StatusUpdate>(url)
                .then((response) => {
                    observer.next(response.data);
                    observer.complete();
                }).catch((err) => {
                    observer.error(err);
                });
        })
    }
    delete(statusId: number): Observable<any> {
        const url = `${this.apiUrl}/${statusId}`;
        return new Observable<StatusUpdate>((observer) => {
            axios.put<StatusUpdate>(url)
                .then((response) => {
                    observer.next(response.data);
                    observer.complete();
                }).catch((err) => {
                    observer.error(err);
                });
        });
    }
}
