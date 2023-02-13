import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/internal/operators/retry';
import { M } from 'src/app/enum/enum';
import { MyUserService, MyUserType } from 'src/app/modules/auth/services/myuser.service';
import { AccountService } from '../../../services/account.services';
import { ToastrService } from 'ngx-toastr';
import { encryptStorage } from 'src/app/services/helper';


@Component({
  selector: 'app-sign-in-method',
  templateUrl: './sign-in-method.component.html',
})
export class SignInMethodComponent implements OnInit, OnDestroy {

  @Input()
  user: MyUserType;
  showChangeEmailForm: boolean = false;
  showChangePasswordForm: boolean = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  email:string
  mp:string;
  old_mp:string
  num_tel:string
  mp2:string
  private unsubscribe: Subscription[] = [];

  iserror=2; iserror2=2;
  message=""
  message2=""

  constructor(private cdr: ChangeDetectorRef,public accountService:AccountService,public toastr:ToastrService,public myUserService:MyUserService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.email=this.user!.email
 
  }

  toggleEmailForm(show: boolean) {
    this.showChangeEmailForm = show;
  }

  saveEmail() {



    if(this.email!=="")
    {
           this.saveemailapi()
    }
    else{
      this.message="requis"
      this.iserror=0;
      this.email=this.user!.email
    }
    this.showChangeEmailForm = false;

  }


  saveemailapi()
  {
    this.isLoading$.next(true);

    let  credi={
      email:this.email

    }
    this.accountService.update_email(credi,this.user!.id_agent).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(M.handleError) // then handle the error
    ).subscribe((data:any) => {
      console.log(data)

      this.isLoading$.next(false);
     
  

      console.log (data.message);
      this.toastr.show(data.message,'',{positionClass:'toast-top-right',timeOut:4000})
      this.message=data.message

  
      if(data.valide==1)
      {
        this.iserror=1
        this.user!.email=this.email 
        
        encryptStorage.setItem("user",this.user);
   
   
   
      console.log(encryptStorage.getItem("user"));



       // this.userService.setUser(this.user)
        
        this.myUserService.user.next(this.user);
        
      }
      else
      {
        this.iserror=0

      }


     // this.loading=0;

     this.cdr.detectChanges();

      //console.log(this.test(data.code));
    
     } );

  }
  togglePasswordForm(show: boolean) {
    this.showChangePasswordForm = show;
  }

  savePassword() {
   console.log(this.mp)


    if(this.mp!="")
    {
      if(this.mp2!=this.mp)
      {
        this.iserror2=0;
        this.message2="les mots de passe ne correspondent pas"
      }
      else{
        this.savepasswordapi()
       
      }
          
    }
    else{
      
      this.message2="requis"
      this.iserror2=0;
     
    } 

  }

  
  savepasswordapi()
  {
    this.isLoading$.next(true);

    let  credi={
      mp:this.mp,
      old_mp:this.old_mp

    }
    this.accountService.update_password(credi,this.user!.id_agent).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(M.handleError) // then handle the error
    ).subscribe((data:any) => {
      console.log(data)

      this.isLoading$.next(false);
     
  

      console.log (data.message);
      this.toastr.show(data.message,'',{positionClass:'toast-top-right',timeOut:4000})
      this.message2=data.message

  
      if(data.valide==1)
      {
        this.iserror2=1
        this.user!.mp=this.mp
        
        encryptStorage.setItem("user",this.user);
   
   
   
      console.log(encryptStorage.getItem("user"));
      this.showChangePasswordForm = false;



       // this.userService.setUser(this.user)
        
        this.myUserService.user.next(this.user);
        
      }
      else
      {
        this.iserror2=0

      }


     // this.loading=0;

     this.cdr.detectChanges();

      //console.log(this.test(data.code));
    
     } );

  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
