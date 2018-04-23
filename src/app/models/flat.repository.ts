import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Room} from './room.model';
import {Flat} from './flat.model';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class FlatRepository {
    public selectedUser: any; 
    private users: any = [];
    constructor(private http: HttpClient) {
        
    }

    getFlats(): Observable<any> { 
        return this.http.get('/flats').map(data => {
            console.log(data);
            return data;
        });
    }

    addFlat(flat: Flat){
        return this.http.post('/flat', flat); 
    }

    updateFlat(flat: any){
        return this.http.put('/flat/'+flat._id, flat); 
    }

    deleteFlat(flat: any): Observable<any>{
        return this.http.delete('/flat/'+flat._id).map(data => {
            console.log(data);
            return data;
        });; 
    }

    getFlatRooms(flat: any){
        this.http.get('/roomAll/'+flat._id).subscribe(data => {
            if(data != null) {
               return data;
            }else {
                return null;
            }
        });
    }

    addRoom(room:Room, flat: any){
        return this.http.post('/addRoom/'+flat._id, room); 
    }

    deleteRoom(room: any, flat: any){
        return this.http.delete('/deleteRoom/'+flat._id+'/'+room._id); 
    }






}