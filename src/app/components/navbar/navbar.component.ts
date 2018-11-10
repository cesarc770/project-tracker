import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    userInfo;
    @Output() open: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userInfo = this.authService.getCurrentUserInfo();
    console.log(this.userInfo)
  }

  openMenu() {
    this.open.emit(true);
  }

}
