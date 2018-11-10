import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  userInfo;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userInfo = this.authService.getCurrentUserInfo();
    console.log(this.userInfo.userName);
  }

  onLogout () {
    this.authService.logout();
  }

}
