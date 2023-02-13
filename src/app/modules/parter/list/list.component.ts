import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { APIURL, M } from 'src/app/enum/enum';
import { PartnerService } from '../partner.services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cssClass: '';
  donne:any
  nb:string;

  constructor(public partnerService:PartnerService,private changeDetectorRef:ChangeDetectorRef) {   

    this.loadAgent();

  }

  ngOnInit(): void {
 


  }

  loadAgent()
  {
    this.partnerService.liste_agent().pipe(
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
    return APIURL.url2+'public/assets/images/agent/'+url
  }


}
