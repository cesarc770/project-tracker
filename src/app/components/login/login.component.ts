import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/Forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const email: string = form.value.email;
    const password:string = form.value.password;

    this.authService.login(email, password);

  }

}
