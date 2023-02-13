import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { APIURL, M } from 'src/app/enum/enum';
import { VendorService } from '../../vendor/vendor.services';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  id: any;
  donne: any;
  myphoto: string;

  constructor(private route: ActivatedRoute,public changeDetectorRef:ChangeDetectorRef,public vendorService:VendorService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')

    this.loadvendeur()

    this.changeDetectorRef.detectChanges();

  }

  loadvendeur()
  {
    this.vendorService.info_vendeur(this.id ).pipe(
      // retry a failed request up to 3 times
         catchError(M.handleError) // then handle the error
       ).subscribe((data:any) => {
         console.log(data);
         this.donne=data;

         this.myphoto=APIURL.url2+'public/assets/images/vendeur/'+this.donne?.photo

         this.changeDetectorRef.detectChanges()
   
       })
  }


}
