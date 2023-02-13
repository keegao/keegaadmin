import { Component } from '@angular/core';
import { encryptStorage } from 'src/app/services/helper';
import { MyUserService, MyUserType } from '../../auth/services/myuser.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  public user:MyUserType;
  constructor( public userService:MyUserService) {
    
    this.user=encryptStorage.getItem("user");



    this.userService.setUser(this.user)
  }

  ngOnInit(): void {

    this.userService.user.subscribe((user)=>{

      this.user=user;
 
  
     })

  }

}
