import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, retry } from 'rxjs/operators';
import { APIURL, M } from 'src/app/enum/enum';
import { encryptStorage, Helper } from 'src/app/services/helper';
import { MyUserService, MyUserType } from '../../auth/services/myuser.service';

import { VendorService } from '../vendor.services';

import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Position } from '@angular/compiler';






@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  countrie:any;
  imgURL: any="./assets/media/avatars/blank.png";
  uploadProgress:any;
  uploadSub: any;
  id:any
  filed:any
  public imagePath:any;
  message: string;
  loading: boolean=false;
  code_tel:any
  code_trans:any

  isLoading:boolean=false
  trans=0
 /* profileForm = new FormGroup({
  nom: new FormControl(''),
 
  email: new FormControl(''),
  num_tel: new FormControl('',),
  num_cni: new FormControl(''),
  pays: new FormControl(null),
  ville: new FormControl(''),
  quartier: new FormControl(''),
  lieu_dit: new FormControl(''),
  id_categorie: new FormControl(''),


  }); */

   profileForm = new FormGroup({
    nom: new FormControl('',[ Validators.required]),
   
    email: new FormControl('',[Validators.required,Validators.pattern(APIURL.emai_regex)]),
    num_tel: new FormControl('',Validators.required),
    num_cni: new FormControl(''),
    pays: new FormControl(null,[Validators.required,Validators.minLength(1)]),
    ville: new FormControl('',Validators.required),
    quartier: new FormControl(),
    lieu_dit: new FormControl(''),
    type_vendeur: new FormControl(null,[Validators.required,Validators.minLength(1)]),
    id_categorie: new FormControl('',Validators.required),
    num_trans: new FormControl(''),
  
  
    });
   

  @ViewChild('fileInput') fileInput:ElementRef;
  @ViewChild('file') file:ElementRef;
  donne: any;
  donne_arange: any;
  user: MyUserType
  lat: any="";
  getAddress: any="";
  lng: any="";

  acceptgeo=false;
  

  constructor(private changeDetectorRef:ChangeDetectorRef,public vendorService:VendorService, private toastr: ToastrService,public  modalService: NgbModal) { 

    this.profileForm.controls['pays'].setValue("Cameroun", {onlySelf: true});

   this.user= encryptStorage.getItem("user");

   this.loadCategorie()
   }

  ngOnInit(): void {
    this.get();
    this.countrie=M.countrie
    this.code_tel="237"
    this.code_trans="237"
   
  }

  telInputObject(obj:any) {
    console.log(obj);
    obj.setCountry('cm');
 
  }

  onCountryChange(event:any)
{
  console.log(event.dialCode);
  console.log(event.name);
  console.log(event.iso2);

  this.code_tel=event.dialCode
}

onCountryChange2(event:any)
{
  console.log(event.dialCode);
  console.log(event.name);
  console.log(event.iso2);

  this.code_trans=event.dialCode
}

selectFile(event:any,files:any) {

  this.filed = event.target.files[0];

/*   var element: HTMLImageElement;

  var image = document.getElementById('preview') as HTMLImageElement
image.src = URL.createObjectURL(event.target.files[0]);
 
  console.log(this.filed) */
  //this.uploadProgress=0
 
   this.preview(files)
 
   
      
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

    loadCategorie()
    {
      this.donne=[];
    
      
      this.vendorService.liste_categorie().pipe(
        // retry a failed request up to 3 times
           catchError(M.handleError) // then handle the error
         ).subscribe((data:any) => {
           console.log(data);
           
           this.donne=data.donne
      
           this.donne_arange=this.arrange_data();
           this.changeDetectorRef.detectChanges()
  
         
     
         })
    }

    uploadFiles()
    {
      this.isLoading=true;
      
  
    
        const formData = new FormData(); 
        let me=this; 
  
      console.log(this.isLoading)
  
  
       console.log(formData);
       this.code_tel+this.profileForm.get("num_tel")?.value
       if (this.filed) {
        formData.append('file', this.filed);  
      }
       formData.append('nom',this.profileForm.get("nom")?.value); 

       let mp=Helper.randomString(6);
 
        formData.append('num_cni', this.profileForm.get("num_cni")?.value); 
        formData.append('pays', this.profileForm.get("pays")?.value);
        formData.append('num_tel',   this.code_tel+this.profileForm.get("num_tel")?.value); 
        formData.append('code_tel', this.code_tel);
        formData.append('email', this.profileForm.get("email")?.value);
        formData.append('ville', this.profileForm.get("ville")?.value); 
        formData.append('quartier', this.profileForm.get("quartier")?.value); 
        formData.append('lieu_dit', this.profileForm.get("lieu_dit")?.value); 
        formData.append('id_categorie', this.profileForm.get("id_categorie")?.value); 
        formData.append('id_agent', this.user!.id_agent.toString()); 
        formData.append('type_vendeur', this.profileForm.get("type_vendeur")?.value); 
        formData.append('mp', mp); 

        formData.append('trans', this.trans.toString());
        if(this.trans==1)
        {
          formData.append('num_trans',   this.code_trans+this.profileForm.get("num_trans")?.value); 
          formData.append('code_trans', this.code_trans);
        }
     
        if(this.acceptgeo==true)
        {
          formData.append('coordonne', this.getAddress); 
        }
        else{
          formData.append('coordonne', ""); 

        }
      /*   formData.append('nom',"ssss"); 
        formData.append('pays',"dddde");
        formData.append('num_tel',   "23563"); 
        formData.append('code_tel', "2354");
        formData.append('email', "2335");
        formData.append('ville', "11233"); 
        formData.append('quartier', "255333"); 
        formData.append('lieu_dit', ""); 
        formData.append('id_categorie', ""); 
        formData.append('id_agent', "1"); 
   */
  
  
      
     
  
      this.vendorService.upload(formData).subscribe((event: HttpEvent<any> ) =>{
        
       

    
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
                  this.changeDetectorRef.detectChanges();
                  if( this.profileForm.get("type_vendeur")?.value=='1')
                  {
                    this.sens_sms(mp);

                  }
                }
      
   
           
             
                 })   
           
 
             this.changeDetectorRef.detectChanges();
  
  
  

          
 
          
         
  
              
  
  
  
           
  
          }

        
  
       
         // console.log(data)
  
        
  
        }) 
  
   
  // @ts-ignore: Object is possibly 'null'.
  
  
  
    }

    sens_sms(mp:String)
    {

      let tel= this.code_tel+this.profileForm.get("num_tel")?.value;
       let numero=this.code_tel+this.profileForm.get("num_tel")?.value;
       let texte="Cher "+this.profileForm.get("nom")?.value+" "+this.profileForm.get("prenom")?.value+" Vous venez d 'inscrire sur la platerforme KEEGAO en tant que vendeur avec les informations suivantes : \n login: "+this.profileForm.get("email")?.value+"/"+tel+"  \n mot de passe :"+mp+" \n .N'oubliez pas de modifier vos identifiants une fois connecté.";

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



    
  open(content:any) {
    const modalRef = this.modalService.open(content);
    //modalRef.componentInstance.name = 'World';

    //this.modalService.dismissAll() ;

    
  }

  choix(val:any)
  {

    val==1?this.acceptgeo=true:this.acceptgeo=false;
    this.modalService.dismissAll() ;

    this.uploadFiles();
    
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

changeStatus(event:Event){
  const isChecked = (<HTMLInputElement>event.target).checked;
  console.log(isChecked)

 this.trans=isChecked ? 1: 0
 if(isChecked)
 {
   this.profileForm.controls["num_trans"]?.setValidators(Validators.required)
  
   this.changeDetectorRef.detectChanges()
 }

 else{

  console.log("clear")
  this.profileForm.controls["num_trans"]?.clearValidators()
 
  this.changeDetectorRef.detectChanges()
  
 }


}

}


