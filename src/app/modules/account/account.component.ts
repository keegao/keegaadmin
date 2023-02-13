import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { APIURL } from 'src/app/enum/enum';
import { encryptStorage } from 'src/app/services/helper';
import { MyUserService, MyUserType } from '../auth/services/myuser.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  public myphoto:string
  public user:MyUserType;
  constructor(public userService:MyUserService,public changeDetectorRef:ChangeDetectorRef) {
    this.user=encryptStorage.getItem("user");

    this.myphoto=APIURL.url2+'public/assets/images/agent/'+this.user?.photo

    this.userService.setUser(this.user)

  }

  ngOnInit(): void{
    this.userService.user.subscribe((user)=>{

      this.user=user;
 
      this.myphoto=APIURL.url2+'public/assets/images/agent/'+user?.photo

      this.changeDetectorRef.detectChanges();
  });

  }
}
