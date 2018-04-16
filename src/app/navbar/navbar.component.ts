import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../models/user.model';
import { UserRepository } from '../models/user.repository';

@Component({
  	selector: 'app-navbar',
  	templateUrl: './navbar.component.html',
  	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  	ngOnInit() {

    }
    
  	ngOnDestroy() {

    }
    
  	constructor(private router: Router, private userRepository: UserRepository){
      console.log(this.userRepository.selectedUser);
    }

	logout() {
		this.userRepository.selectedUser= null;
		this.userRepository.logout();
		this.router.navigate(['']);
  }

}