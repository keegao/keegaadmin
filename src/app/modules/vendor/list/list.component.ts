import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { APIURL, M } from 'src/app/enum/enum';
import { encryptStorage } from 'src/app/services/helper';
import { MyUserType } from '../../auth/services/myuser.service';
import { VendorService } from '../vendor.services';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cssClass: '';
  donne:any
  nb:string;
user:MyUserType
lat: any="";
getAddress: any="";
lng: any="";

id_select=0;



  constructor(public vendorService:VendorService,private changeDetectorRef:ChangeDetectorRef,public modalService: NgbModal) {   




  }

  ngOnInit(): void {
     
    this.user=encryptStorage.getItem('user')
    this.loadAgent();

    this.get();


  }

  loadAgent()
  {
    this.vendorService.liste_vendeur(this.user!.id_agent).pipe(
      // retry a failed request up to 3 times
         catchError(M.handleError) // then handle the error
       ).subscribe((data:any) => {
         console.log(data);
         this.donne=data.donne
         this.nb=this.donne.length;
         this.changeDetectorRef.detectChanges()
   
       })
  }

  myphoto(url:string)
  {
    return APIURL.url2+'public/assets/images/vendeur/'+url
  }

  get() {  


  

    navigator.geolocation.getCurrentPosition((position) => {  
        if (position) {  
            this.lat = position.coords.latitude;  
            this.lng = position.coords.longitude; 
            
            console.log(this.lat+','+this.lng);
            this.getAddress=this.lat+','+this.lng;
     
            console.log(position)  
         
        }  
    })  ;

 
} 

open(content:any,id_vendeur:any) {
  const modalRef = this.modalService.open(content);

  this.id_select=id_vendeur;
  //modalRef.componentInstance.name = 'World';

  //this.modalService.dismissAll() ;

  
}

updatePosition()
{
  let credi={
    "coordonne":this.getAddress
  }
  
  this.vendorService.update_vendeur(credi,this.id_select).pipe(
    // retry a failed request up to 3 times
       catchError(M.handleError) // then handle the error
     ).subscribe((data:any) => {
       console.log(data);
     
       this.modalService.dismissAll() ;
 
     })

}


}
