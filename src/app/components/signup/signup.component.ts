import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/Forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const fname = form.value.fname;
    const lname = form.value.lname;

    this.authService.signupUser(email, password, fname, lname);

  }

}
