import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EqualValidator } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserRepository } from './models/user.repository'
import { User } from './models/user.model';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

const appRoutes: Routes =[
  { 
    path: '', 
    component: HomeComponent,
    data: { title: 'Home' }
},
  { 
      path: 'signup', 
      component: SignupComponent,
      data: { title: 'Sign Up' }
  },
  { 
      path: 'login', 
      component: LoginComponent,
      data: { title: 'Sign In' } 
  },
{ path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    EqualValidator
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes),FormsModule,ReactiveFormsModule,HttpClientModule
  ],
  providers: [UserRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }
