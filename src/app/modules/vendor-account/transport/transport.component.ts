import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, retry } from 'rxjs/operators';
import { APIURL, M } from 'src/app/enum/enum';
import { encryptStorage } from 'src/app/services/helper';
import { MyUserService, MyUserType } from '../../auth/services/myuser.service';

import { VendorService } from '../../vendor/vendor.services';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {

  profileForm :any
  isLoading:boolean=false
  update=false;
  mydata:any=null;


  
  
    
  
  
 

    id:any


  constructor(private route: ActivatedRoute,private changeDetectorRef:ChangeDetectorRef,public vendorService:VendorService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')

    this.check_transport();

 

    this.changeDetectorRef.detectChanges();

  }



check_transport()
{
  
  this.vendorService.check_vendor_transport(this.id).pipe(
    // retry a failed request up to 3 times
       catchError(M.handleError) // then handle the error
     ).subscribe((data:any) => {
       console.log(data);
       if(data["num"]==1)
       {
        this.mydata=data['data'];
        this.update=true;

    
       }

       this.profileForm = new FormGroup({

   
        distance1: new FormControl(this.mydata==null?"250":this.mydata['distance1'],[Validators.required]),    
        distance2: new FormControl(this.mydata==null?"500":this.mydata['distance2'],[Validators.required]),
        distance3: new FormControl(this.mydata==null?"1000":this.mydata['distance3'],[Validators.required]),
        distance4: new FormControl(this.mydata==null?"1500":this.mydata['distance4'],[Validators.required]),
    
      });
     
   
 
     })

}

add_transport()
{
        let data={
          "id_vendeur":this.id,
          "distance1": this.profileForm.get("distance1")?.value,
          "distance2": this.profileForm.get("distance2")?.value,
          "distance3": this.profileForm.get("distance3")?.value,
          "distance4": this.profileForm.get("distance4")?.value,
        }
      
        this.vendorService.add_vendor_transport(data).pipe(
          // retry a failed request up to 3 times
             catchError(M.handleError) // then handle the error
           ).subscribe((data:any) => {
             console.log(data);
             this.isLoading=false;
             this.toastr.show(data['message'],'',{positionClass:'toast-top-center',timeOut:4000});
             this.changeDetectorRef.detectChanges();
         
       
           })

}

update_transport()
{
        let data={
          
          "distance1": this.profileForm.get("distance1")?.value,
          "distance2": this.profileForm.get("distance2")?.value,
          "distance3": this.profileForm.get("distance3")?.value,
          "distance4": this.profileForm.get("distance4")?.value,
        }
      
        this.vendorService.update_vendor_transport(data,this.mydata['id_prix']).pipe(
          // retry a failed request up to 3 times
             catchError(M.handleError) // then handle the error
           ).subscribe((data:any) => {
             console.log(data);
             this.isLoading=false;
             this.toastr.show(data['message'],'',{positionClass:'toast-top-center',timeOut:4000});
             this.changeDetectorRef.detectChanges();
         
       
           })

}

action(){

  this.isLoading=true;
 this.update==false? this.add_transport():this.update_transport();

}



}
