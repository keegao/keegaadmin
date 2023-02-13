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
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  countrie:any;
  imgURL: any="./assets/media/avatars/blank.png";
  uploadProgress:any;
  uploadSub: any;
  id:any
  filed:any
  files:any
  public imagePath:any;
  message: string;
  loading: boolean=false;
  code_tel:any
  stock:number=1;

  promo=0

  isLoading:boolean=false

  couleur=["noir","Gris","Vert","Organge","Pourple","Rouge","Violet","Blanc","Jaune"]

  taille=["L","M","S","XL","XXL"]

  profileForm = new FormGroup({
    nom: new FormControl('',[ Validators.required]),
   
    tarif_r: new FormControl('',[Validators.required]),
    tarif_p: new FormControl(''),
    poids: new FormControl(''),
    lg: new FormControl(''),
    larg: new FormControl(''),
    hauteur: new FormControl(''),
    couleur: new FormControl(''),
    taille: new FormControl(''),
    description: new FormControl(''),
    debut_p: new FormControl(''),

    fin_p: new FormControl(''),
    
  
  
    });

    urls = new Array<string>();
   

  @ViewChild('fileInput') fileInput:ElementRef;
  @ViewChild('file') file:ElementRef;
  donne: any;
  donne_arange: any;
  user: MyUserType
  


  constructor(private route: ActivatedRoute,private changeDetectorRef:ChangeDetectorRef,public vendorService:VendorService, private toastr: ToastrService) { 

    //this.profileForm.controls['pays'].setValue("Cameroun", {onlySelf: true});
    this.stock=1;
    this.promo=0;

   this.user= encryptStorage.getItem("user");

 
   }

  ngOnInit(): void {
    this.countrie=M.countrie
    this.code_tel="237"

    this.stock=1;
    this.id = this.route.snapshot.paramMap.get('id')


    this.changeDetectorRef.detectChanges()
   
  }

  telInputObject(obj:any) {
    console.log(obj);
    obj.setCountry('cm');
 
  }

  changeStatus(event:Event){
    const isChecked = (<HTMLInputElement>event.target).checked;
    console.log(isChecked)

   this.promo=isChecked ? 1: 0
   if(isChecked)
   {
     this.profileForm.controls["tarif_p"]?.setValidators(Validators.required)
     this.profileForm.controls["debut_p"]?.setValidators(Validators.required)
     this.profileForm.controls["fin_p"]?.setValidators(Validators.required)
     this.changeDetectorRef.detectChanges()
   }

   else{

    console.log("clear")
    this.profileForm.controls["tarif_p"]?.clearValidators()
    this.profileForm.controls["debut_p"]?.clearValidators()
    this.profileForm.controls["fin_p"]?.clearValidators()

    this.profileForm.controls["tarif_p"]?.updateValueAndValidity()
    
    this.profileForm.controls["debut_p"]?.updateValueAndValidity()
    
    this.profileForm.controls["fin_p"]?.updateValueAndValidity()
    this.changeDetectorRef.detectChanges()
    
   }


}

changeStatus2(event:Event){
  const isChecked = (<HTMLInputElement>event.target).checked;
  console.log(isChecked)

 this.stock=isChecked ? 1: 0

 
}

  onCountryChange(event:any)
{
  console.log(event.dialCode);
  console.log(event.name);
  console.log(event.iso2);

  this.code_tel=event.dialCode
}


     preview(files:any) {
      if (files.length === 0)
        return;
   
      var mimeType = files[0].type;
       if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
       else{
         this.message = "";
   
       }
   
      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]); 
      
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
        console.log(     this.imgURL);
        this.changeDetectorRef.detectChanges()
      }
    }

    triggerFile() {
      console.log("super");
      this.fileInput.nativeElement.click();
    }
 
    test()
    {
      console.log(this.code_tel+this.profileForm.get("num_tel")?.value);

   
    }

 

    detectFiles(event:any) {
     // this.urls = [];
      this.files = event.target.files;
      if (this.files) {
        for (let file of this.files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls.push(e.target.result);
            this.changeDetectorRef.detectChanges()
          }
          reader.readAsDataURL(file);

         
        }
      }
    }

    
selectFile(event:any,files:any) {

  this.filed = event.target.files[0];


 
   this.preview(files)
 
   
      
     }


    uploadFiles()
    {
      this.isLoading=true;
      
  
    
        const formData = new FormData(); 
        let me=this; 
  
      console.log(this.isLoading)
  
  
       console.log(formData);
     
       if (this.filed) {
        formData.append('file', this.filed);  
      }

      if(this.files)
      {
        Array.from(this.files).forEach((file:any) => { formData.append('files[]', file); });
      }
       formData.append('nom',this.profileForm.get("nom")?.value); 
 
       this.profileForm.get("tarif_r")?.value!=""? formData.append('tarif_r', this.profileForm.get("tarif_r")?.value):""; 
       this.profileForm.get("tarif_p")?.value!=""?    formData.append('tarif_p', this.profileForm.get("tarif_p")?.value):"";
        formData.append('stock',   this.stock.toString()); 
        this.profileForm.get("lg")?.value!=""? formData.append('lg', this.profileForm.get("lg")?.value):"";
        this.profileForm.get("larg")?.value!=""? formData.append('larg', this.profileForm.get("larg")?.value):"";
        this.profileForm.get("hauteur")?.value!=""? formData.append('hauteur', this.profileForm.get("hauteur")?.value):""; 
     
        this.profileForm.get("couleur")?.value!=""? formData.append('couleur', this.profileForm.get("couleur")?.value):"";
        this.profileForm.get("taille")?.value!=""?  formData.append('taille', this.profileForm.get("taille")?.value):""; 
        formData.append('id_vendeur', this.id.toString()); 

        this.profileForm.get("description")?.value!=""?formData.append('description', this.profileForm.get("description")?.value):""; 

        formData.append('promo', this.promo.toString());
        this.profileForm.get("debut_p")?.value!=""?formData.append('debut_p', this.profileForm.get("debut_p")?.value):""; 

        this.profileForm.get("fin_p")?.value!=""? formData.append('fin_p', this.profileForm.get("fin_p")?.value):""; 

    
  
  
      
     
  
      this.vendorService.upload2(formData).subscribe((event: HttpEvent<any> ) =>{
        
    

    
          if(event.type==HttpEventType.Response)
          { 
            this.isLoading=false;
  
            console.log(this.isLoading)
       
              console.log(event.body)
  
              let data=event.body;
  
       
              

                  this.toastr.show(event.body.message,'',{positionClass:'toast-top-center',timeOut:4000}).onHidden.subscribe(() => {
       
           
                if(data.valide==1)
                {

               
      
        
                  this.fileInput.nativeElement.value = null;
                  this.file.nativeElement.value = null;
                  this.imgURL="./assets/media/avatars/blank.png";
                  this.profileForm.reset()
                  this.filed=null;
                  this.files=null
                  this.changeDetectorRef.detectChanges();
                }
      
   
           
             
                 })   
           
 
             this.changeDetectorRef.detectChanges();
  
  
  

          
 
          
         
  
              
  
  
  
           
  
          }

        
  
       
         // console.log(data)
  
        
  
        }) 
  
   
  // @ts-ignore: Object is possibly 'null'.
  
  
  
    }

    sens_sms()
    {
       let numero=this.code_tel+this.profileForm.get("num_tel")?.value;
       let texte="Cher "+this.profileForm.get("nom")?.value+" "+this.profileForm.get("prenom")?.value+" Vous venez d 'inscrire sur la platerforme KEEGAO en tant que agent avec les informations suivantes : \n login: "+this.profileForm.get("email")?.value+" \n mot de passe :Keegao02 \n .N'oubliez pas de modifier vos identifiants une fois connecté.";

       let credi={
         num:numero,
         message:texte

       }

       this.vendorService.sens_sms_inscription(credi).pipe(
     // retry a failed request up to 3 times
        catchError(M.handleError) // then handle the error
      ).subscribe((data:any) => {
        console.log(data)
  
      })

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
