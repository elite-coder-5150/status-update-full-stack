import { Injectable } from '@angular/core';
import axios from 'axios';
import { StatusUpdate } from '../models/status-update';

@Injectable({
    providedIn: 'root',
})
export class StatusUpdateService {
    private apiUrl = 'http://localhost:3000/status-updates';

    constructor() {}

    getAllStatusUpdates(): Promise<StatusUpdate[]> {
        return axios.get<StatusUpdate[]>(this.apiUrl)
            .then(response => response.data)
            .catch(error => {
                throw error;
            })
    }

    getSingleStatusUpdate(statusId: number): Promise<StatusUpdate> {
        const url = `${this.apiUrl}/status/${statusId}`;

        return axios.get<StatusUpdate>(url)
            .then(response => response.data)
            .catch(err => {
                throw err;
            });
    }

    updateStatus(statusId: number, updatedStatus: StatusUpdate): Promise<StatusUpdate> {
        const url = `${this.apiUrl}/${statusId}`;

        return axios.put<StatusUpdate>(url, updatedStatus)
            .then(response => response.data)
            .catch(err => {
                throw err;
            })
    }

    delete(statusId: number, updatedStatus: StatusUpdate): Promise<void> {
        const url = `${this.apiUrl}/${statusId}`;

        return axios.delete(url)
            .then(() => {})
            .catch(err => {
                throw err;
            });
    }
}