import { Component, OnInit } from '@angular/core';
import { MyUserService } from 'src/app/modules/auth/services/myuser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public myUserService:MyUserService) {

    console.log(this.myUserService.getUser())
  }

  ngOnInit(): void {}
}
