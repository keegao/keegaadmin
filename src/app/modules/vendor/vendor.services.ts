import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse,HttpEvent, HttpEventType } from '@angular/common/http';
import { APIURL } from 'src/app/enum/enum';
@Injectable({
    providedIn: 'root'
  })

  export class VendorService {


    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded',
    
        })
      };

    

      constructor(public http: HttpClient) { }

      public upload(formData:any) {
 
        return this.http.post<any>(APIURL.url+'admin/verif_inscription_vendeur/', formData, {
  
     
  
          observe: 'events',
       
  
        });
  
  
  
    }

    public upload2(formData:any) {
 
      return this.http.post<any>(APIURL.url+'admin/verif_inscription_produit/', formData, {

   

        observe: 'events',
     

      });



  }


    update_password(credi:any,id:any)  {

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
  
      //let options = new HttpHeaders({ headers: headers });
  
  
  
     return this.http.post<any>(APIURL.url+'admin/verif_update_mp/'+id, JSON.stringify(credi),this.httpOptions);
  
  }

sens_sms_inscription(credi:any)  {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    //let options = new HttpHeaders({ headers: headers });



   return this.http.post<any>(APIURL.url+'sms/send_sms/', JSON.stringify(credi),this.httpOptions);

}


add_categorie(credi:any)  {

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //let options = new HttpHeaders({ headers: headers });



 return this.http.post<any>(APIURL.url+'admin/add_categorie_vendeur/', JSON.stringify(credi),this.httpOptions);

}

add_categorie_produit(credi:any)  {

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //let options = new HttpHeaders({ headers: headers });



 return this.http.post<any>(APIURL.url+'admin/add_categorie_produit/', JSON.stringify(credi),this.httpOptions);

}


liste_categorie()  {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    //let options = new HttpHeaders({ headers: headers });



   return this.http.get<any>(APIURL.url+'admin/liste_categorie/',this.httpOptions);

}



check_vendor_transport(id:any)  {

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //let options = new HttpHeaders({ headers: headers });



 return this.http.get<any>(APIURL.url+'admin/check_transport/'+id,this.httpOptions);

}


liste_categorie_produit()  {

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //let options = new HttpHeaders({ headers: headers });



 return this.http.get<any>(APIURL.url+'admin/liste_categorie_produit/',this.httpOptions);

}

liste_vendeur(id:any)  {

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //let options = new HttpHeaders({ headers: headers });



 return this.http.get<any>(APIURL.url+'admin/liste_vendeur/'+id,this.httpOptions);

}


liste_produit(id:any)  {

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //let options = new HttpHeaders({ headers: headers });



 return this.http.get<any>(APIURL.url+'admin/liste_produit/'+id,this.httpOptions);

}

info_vendeur(id:any)  {

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //let options = new HttpHeaders({ headers: headers });



 return this.http.get<any>(APIURL.url+'admin/info_vendeur/'+id,this.httpOptions);

}



  
  update_email(credi:any,id:any)  {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    //let options = new HttpHeaders({ headers: headers });



   return this.http.post<any>(APIURL.url+'admin/change_email/'+id, JSON.stringify(credi),this.httpOptions);

}

add_vendor_transport(credi:any)  {

  let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    //let options = new HttpHeaders({ headers: headers });



   return this.http.post<any>(APIURL.url+'admin/add_prix_transport/', JSON.stringify(credi),this.httpOptions);

}

update_vendor_transport(credi:any,id:any)  {

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //let options = new HttpHeaders({ headers: headers });



 return this.http.post<any>(APIURL.url+'admin/update_prix_transport/'+id, JSON.stringify(credi),this.httpOptions);

}


update_vendeur(credi:any,id:any)  {

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //let options = new HttpHeaders({ headers: headers });



 return this.http.post<any>(APIURL.url+'admin/update_vendeur/'+id, JSON.stringify(credi),this.httpOptions);

}



vente_mois()  {

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //let options = new HttpHeaders({ headers: headers });



 return this.http.get<any>(APIURL.url+'admin/vente_du_mois/',this.httpOptions);

}

vente_dernier_mois()  {

  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  //let options = new HttpHeaders({ headers: headers });



 return this.http.get<any>(APIURL.url+'admin/vente_dernier_mois/',this.httpOptions);

}






  



  }