import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { APIURL, M } from 'src/app/enum/enum';
import { VendorService } from '../vendor.services';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnInit {
  cssClass: '';
  donne:any
  nb:string;
  donne_sub: any;
  donne_arange:any

  isLoading:boolean=false
  profileForm = new FormGroup({
  nom: new FormControl('',[ Validators.required]),
  id_parent: new FormControl('',[ Validators.required]),
 


  });


  constructor(public vendorService:VendorService,private changeDetectorRef:ChangeDetectorRef) {   

    this.loadCategorie();

  }

  ngOnInit(): void {
 


  }

  loadCategorie()
  {
    this.donne=[];
    this.donne_sub=[]
    this.donne_arange=[]
    
    this.vendorService.liste_categorie().pipe(
      // retry a failed request up to 3 times
         catchError(M.handleError) // then handle the error
       ).subscribe((data:any) => {
         console.log(data);
         this.donne_sub=data.donne_sub
         this.donne=data.donne
         this.nb=this.donne.length;
         this.donne_arange=this.arrange_data();
         this.changeDetectorRef.detectChanges()

       
   
       })
  }

  addCategaorie()
  {
    let credi={
      libelle:this.profileForm.get('nom')?.value,
      id_parent:this.profileForm.get('id_parent')?.value,
      level:1

    }

    this.vendorService.add_categorie(credi).pipe(
  // retry a failed request up to 3 times
     catchError(M.handleError) // then handle the error
   ).subscribe((data:any) => {
     console.log(data)

     this.isLoading=false;
     this.changeDetectorRef.detectChanges();
     this.loadCategorie()

   })

  }

  myphoto(url:string)
  {
    return APIURL.url2+'public/assets/images/agent/'+url
  }


  arrange_data()
  {
    const rawData=this.donne;
    const getParentDeep = (arr:any, targetId:any) => arr.find(({ id_categorie }:any) => id_categorie === targetId)
    ?? arr.flatMap(({ children  }:any) => getParentDeep(children , targetId))
    .filter((e:any) => e)
    .at(0);

const result = rawData
  .sort(({ id_parent: a }:any, { id_parent: b }:any) => a - b)
  .reduce((acc:any, { id_categorie, libelle, id_parent }:any) => {
    const obj = { id_categorie, name: libelle, children: [] };
    const parentObj = getParentDeep(acc, id_parent);
    if (parentObj) parentObj.children.push(obj)
    else acc.push(obj);
    return acc;
}, []);

console.log(result);

return result;
  }


}
