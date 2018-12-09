import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('signupForm') signupForm: NgForm;

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
  }

  onSignup()
  {
    if(this.signupForm.invalid){
      return;
    }

    this.AuthService.signup(this.signupForm.value.email, this.signupForm.value.password);

  }
}
