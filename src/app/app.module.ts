import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EqualValidator } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserRepository } from './models/user.repository'
import { User } from './models/user.model';
import { FlatRepository } from './models/flat.repository'
import { Flat } from './models/flat.model';
import { Room } from './models/room.model';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { AddFlatComponent } from './add-flat/add-flat.component';

import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { UpdateFlatComponent } from './update-flat/update-flat.component';




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
    path: 'updateflat', 
    component: UpdateFlatComponent,
    data: { title: 'Edit flat' }
},
  { 
    path: 'addflat', 
    component: AddFlatComponent,
    data: { title: 'Add Flat' }
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
    EqualValidator,
    AddFlatComponent,
    UpdateFlatComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes),FormsModule,ReactiveFormsModule,HttpClientModule,
    InlineEditorModule
  ],
  providers: [UserRepository,FlatRepository,AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
