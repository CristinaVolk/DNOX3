import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm} from '@angular/forms';
import { UserRepository } from '../models/user.repository';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  	selector: 'app-signup',
  	templateUrl: './signup.component.html',
  	styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    private user: User;
    
	  constructor(private userRepository: UserRepository, private router: Router) {

     }
 	 onSubmit(form: NgForm){
		var data = form.form.controls;
		this.user = new User(data.name.value, data.surname.value, data.email.value, data.password.value);
    	this.userRepository.createUser(this.user).subscribe(data=> {
        
        this.userRepository.selectedUser(data.user);
        this.router.navigate(['']);
        console.log("registered");
        console.log(data);
    	});
  	}
}

import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[Equalvalidate][formControlName],[formControl],[ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EqualValidator),
            multi: true
        }
    ]
})
export class EqualValidator implements Validator {

    constructor(@Attribute('Equalvalidate') public Equalvalidate: string) { }

    validate(abControl: AbstractControl): { [key: string]: any } {
        // Get self value.
        let val = abControl.value;

        // Get control value.
        let cValue = abControl.root.get(this.Equalvalidate);

        // value not equal
        if (cValue && val !== cValue.value) return {
            Equalvalidate: false
        }

        return null;
    }
}