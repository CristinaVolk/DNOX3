import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';
import { UserRepository } from '../models/user.repository';
import { User } from '../models/user.model';


@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    private user: User;
    private isLogged = true;
    private msg: any="";
  	constructor(private userrepository: UserRepository, private router: Router) { }
  	onSubmit(form: NgForm){
    	var data = form.form.controls;
        this.user = new User("","",data.email.value, data.password.value);
        console.log(this.user);
      	this.userrepository.login(this.user).subscribe(data=> {
          console.log(data);
			if (!data.success) {
        //this.dialog.openNotificationDialog(data["text"], data["status"]);
        this.msg = "Wrong data";
        this.isLogged = false;
			}else {
        this.userrepository.selectUser(data.user);
        console.log("logged");
        console.log(data);
				this.router.navigate(['']);
			}
      	});
	}
}