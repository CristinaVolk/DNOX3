import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Room} from './room.model';
import {Flat} from './flat.model';
import { Observable } from "rxjs/Observable";


@Injectable()
export class FlatRepository {
    public selectedUser: any; 
    private users: any = [];
    constructor(private http: HttpClient) {
        
    }

    getFlats(){
        this.http.get('/flats',).subscribe(data => {
            if(data != null) {
               return data;
            }else {
                return null;
            }
        });
    }

    addFlat(flat: Flat){
        return this.http.post('/flat', flat); 
    }

    updateFlat(flat: any){
        return this.http.put('/flat/'+flat._id, flat); 
    }

    deleteFlat(flat: any){
        return this.http.delete('/flat/'+flat._id); 
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