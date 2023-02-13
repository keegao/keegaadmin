import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIURL } from 'src/app/enum/enum';
import { MyUserModel } from 'src/app/modules/auth/models/myuser.model';
import { MyUserService, MyUserType } from 'src/app/modules/auth/services/myuser.service';
import { encryptStorage } from 'src/app/services/helper';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  public myphoto:string
  public user:MyUserType;

  constructor(private layout: LayoutService,public userService:MyUserService,public changeDetectorRef:ChangeDetectorRef) {
 console.log(encryptStorage.getItem("user"));

this.user=encryptStorage.getItem("user");
    console.log(this.user?.photo);
    this.myphoto=APIURL.url2+'public/assets/images/agent/'+this.user?.photo
    console.log(this.myphoto);
    this.userService.setUser(this.user)

  }

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;

    this.userService.user.subscribe((user)=>{

     // this.user=user;

     this.myphoto=APIURL.url2+'public/assets/images/agent/'+user?.photo

     this.changeDetectorRef.detectChanges();
    })
  }
}
