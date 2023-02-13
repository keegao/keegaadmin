import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse,HttpEvent, HttpEventType } from '@angular/common/http';
import { APIURL } from 'src/app/enum/enum';
@Injectable({
    providedIn: 'root'
  })

  export class AccountService {


    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded',
    
        })
      };

    

      constructor(public http: HttpClient) { }

      public upload(formData:any,id:any) {
 
        return this.http.post<any>(APIURL.url+'admin/verif_update_user/'+id, formData, {
  
          reportProgress: true,
  
          observe: 'events',
       
  
        });
  
  
  
    }

    update_password(credi:any,id:any)  {

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
  
      //let options = new HttpHeaders({ headers: headers });
  
  
  
     return this.http.post<any>(APIURL.url+'admin/verif_update_mp/'+id, JSON.stringify(credi),this.httpOptions);
  
  }

  
  update_email(credi:any,id:any)  {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    //let options = new HttpHeaders({ headers: headers });



   return this.http.post<any>(APIURL.url+'admin/change_email/'+id, JSON.stringify(credi),this.httpOptions);

}
  



  }