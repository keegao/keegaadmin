import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MyUserModel } from "../models/myuser.model";
export type MyUserType =MyUserModel | undefined;

@Injectable({
  providedIn: 'root',
})


export class MyUserService {
 user = new BehaviorSubject<MyUserType>(undefined );
  image = new BehaviorSubject(undefined);

  setUser(user: MyUserType) {
    this.user.next(user);
  }

  getUser(): MyUserType{


    return this.user.value;
  }

 
}