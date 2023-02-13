import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { catchError, first, retry } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { encryptStorage } from 'src/app/services/helper';
import { MyUserModel } from '../../models/myuser.model';
import { MyUserService } from '../../services/myuser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: 'admin@demo.com',
    password: 'demo',
  };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;


  // private fields
  private unsubscribe: Subscription[] = []; 
  
  user =new MyUserModel();// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,

    private myUserService:MyUserService


      ) {

    encryptStorage.clear();
    this.isLoading$ = this.authService.isLoading$;
    this.hasError=false;


    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
               '',
        Validators.compose([
          Validators.required,

          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
      '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

 /*  submit() {
    this.hasError = false;
    const loginSubscr = this.authService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((user: UserModel | undefined) => {
        if (user) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  } */


  submit() {
    this.authService.verifLogin(this.f.email.value, this.f.password.value).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.authService.handleError) // then handle the error
    ).subscribe((data:any) => {
      console.log(data)

      

      console.log (data.message);
     // this.loading=0;

      if(data.valide==0)
      {
            console.log(data.valide)      
        this.hasError = true;
        this.authService.isLoadingSubject.next(false);
        //this.router.navigate(['/'])


      }
      else
      {
        //this.toastr.show(data.message,'',{positionClass:'toast-top-right',timeOut:4000}).onHidden.subscribe(() => {
 


          encryptStorage.setItem('token', data.token);
          encryptStorage.setItem("user",data.donne);

      this.authService.setlogging(true);

          console.log("salut");

          this.router.navigate(["/"]);

         

          this.user=data.donne;
          console.log(this.user)

   this.myUserService.setUser(this.user);
          //this.authService.isLoadingSubject.next(false);

          console.log(this.myUserService.getUser())
   

    

      }

      //console.log(this.test(data.code));
    
     } );
      }

 
  

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
