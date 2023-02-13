import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, retry } from 'rxjs/operators';
import { APIURL, M } from 'src/app/enum/enum';
import { PartnerService } from '../partner.services';

@Component({
  selector: 'app-add-parter',
  templateUrl: './add-parter.component.html',
  styleUrls: ['./add-parter.component.scss']
})
export class AddParterComponent implements OnInit {
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

  isLoading:boolean=false
  profileForm = new FormGroup({
  nom: new FormControl('',[ Validators.required]),
  prenom: new FormControl('',),
  email: new FormControl('',[Validators.required,Validators.pattern(APIURL.emai_regex)]),
  num_tel: new FormControl('',Validators.required),
  num_cni: new FormControl(''),
  pays: new FormControl(''),


  });

  @ViewChild('fileInput') fileInput:ElementRef;
  @ViewChild('file') file:ElementRef;
  

  constructor(private changeDetectorRef:ChangeDetectorRef,public partnerService:PartnerService, private toastr: ToastrService) {  }

  ngOnInit(): void {
    this.countrie=M.countrie
    this.code_tel="237"
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
        formData.append('prenom', this.profileForm.get("prenom")?.value); 
        formData.append('num_cni', this.profileForm.get("num_cni")?.value); 
        formData.append('pays', this.profileForm.get("pays")?.value);
        formData.append('num_tel',   this.code_tel+this.profileForm.get("num_tel")?.value); 
        formData.append('code_tel', this.code_tel);
        formData.append('email', this.profileForm.get("email")?.value);
  
  
      
     
  
      this.partnerService.upload(formData).subscribe((event: HttpEvent<any> ) =>{
        
    
          console.log(event)
    
          if(event.type==HttpEventType.Response)
          { 
            this.isLoading=false;
  
            console.log(this.isLoading)
       
              console.log(event.body)
  
              let data=event.body;
  
       
              

              this.toastr.show(event.body.message,'',{positionClass:'toast-top-center',timeOut:4000}).onHidden.subscribe(() => {
       

                if(data.valide==1)
                {

                  this.sens_sms();
      
        
                  this.fileInput.nativeElement.value = null;
                  this.file.nativeElement.value = null;
                  this.imgURL="./assets/media/avatars/blank.png";
                  this.profileForm.reset()
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

       this.partnerService.sens_sms_inscription(credi).pipe(
     // retry a failed request up to 3 times
        catchError(M.handleError) // then handle the error
      ).subscribe((data:any) => {
        console.log(data)
  
      })

    }
  
}
