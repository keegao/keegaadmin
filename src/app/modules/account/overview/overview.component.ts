import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { encryptStorage } from 'src/app/services/helper';
import { MyUserService, MyUserType } from '../../auth/services/myuser.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  public user:MyUserType;
  constructor( public userService:MyUserService,public changeDetectorRef:ChangeDetectorRef) {
    
    this.user=encryptStorage.getItem("user");



    this.userService.setUser(this.user)
  }

  ngOnInit(): void {

    this.userService.user.subscribe((user)=>{

      this.user=user;
 
  
      this.changeDetectorRef.detectChanges();



     })

  }

}
