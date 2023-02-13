import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { APIURL, M } from 'src/app/enum/enum';
import { VendorService } from '../../vendor/vendor.services';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  id:any
  donne: any;

  constructor(public vendorService:VendorService,private route: ActivatedRoute,public changeDetectorRef:ChangeDetectorRef ) {


   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')

    this.loadProduit()
  }

  loadProduit()
  {
    this.vendorService.liste_produit(this.id).pipe(
      // retry a failed request up to 3 times
         catchError(M.handleError) // then handle the error
       ).subscribe((data:any) => {
         console.log(data);
         this.donne=data.donne
       
         this.changeDetectorRef.detectChanges()
   
       })
  }

  myphoto(url:string)
  {
    return APIURL.url2+'public/assets/images/article/'+url
  }



}
