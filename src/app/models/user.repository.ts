import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './user.model';
import { Observable } from "rxjs/Observable";
   
@Injectable()
export class UserRepository {
    public selectedUser: any; 
    private users: any = [];
    constructor(private http: HttpClient) {
        this.http.get('/me').subscribe(data => {
            if(data != null) {
                this.selectedUser = data;
            }else {
                this.selectedUser = null;
            }
        });
    }
    
    createUser(user: User):any {
        return this.http.post('/register', user); 
    }
    /* setAdmin(user: User[]) {
        return this.http.post('/setadmin', user);
    } */

    selectUser(user: User) {
        console.log("select user");
        console.log(user);
        this.selectedUser = user;
    }

    login(user: User) :any {
        return this.http.post('/login', user);
    }

    isAuth() {
        return this.selectedUser == null? false: true;
    }

    logout() {
        this.http.get('/logout').subscribe();
    }

}