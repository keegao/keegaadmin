import { HttpEvent, HttpEventType } from '@angular/common/http';

import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { APIURL, M } from 'src/app/enum/enum';
import { MyUserService, MyUserType } from 'src/app/modules/auth/services/myuser.service';
import { encryptStorage } from 'src/app/services/helper';
import { AccountService } from '../../../services/account.services';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
})
export class ProfileDetailsComponent implements OnInit {
  @Input()
user: MyUserType;
countrie:any;
public  nom:any="";
num_cni:any
prenom:any




  isLoading: boolean;

  myphoto: string;
  mycount:string 

  public imagePath:any;
  imgURL: any="./assets/media/avatars/blank.png";
  message: string;
  loading: boolean=false;
  uploadProgress:any;
  uploadSub: any;
  id:any
  filed:any

/* 
  @ViewChild("fileUpload", {static: false}) 
  fileUpload: ElementRef;files = []; */

  @ViewChild('fileInput') fileInput:ElementRef;


  constructor(public accountService :AccountService,private changeDetectorRef:ChangeDetectorRef,public myUserService:MyUserService) {



    this.myphoto=APIURL.url2+'public/assets/images/agent/'+this.user?.photo
  }

  ngOnInit(): void {
    this.myphoto=APIURL.url2+'public/assets/images/agent/'+this.user?.photo

    this.countrie=M.countrie
    this.mycount=this.user!.pays
    this.nom=this.user?.nom;
      this.prenom=this.user?.prenom
      this.num_cni=this.user?.num_cni

    console.log(this.countrie)

    this.isLoading=false
  }



  selectFile(event:any,files:any) {

    this.filed = event.target.files[0];

     var element: HTMLImageElement;

    var image = document.getElementById('preview') as HTMLImageElement
	image.src = URL.createObjectURL(event.target.files[0]);
   
    console.log(this.filed) 
    //this.uploadProgress=0
   
     this.preview(files)

     this.changeDetectorRef.detectChanges()
   
     
        
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
          this.myphoto=this.imgURL;
          console.log(  "rien"+   this.imgURL);
     
        }

        this.changeDetectorRef.detectChanges()
      }

      triggerFile() {
        console.log("super");
        this.fileInput.nativeElement.click();
      }
   
  ngOnDestroy() {
   
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
      formData.append('nom', this.nom); 
      formData.append('prenom', this.prenom); 
      formData.append('num_cni', this.num_cni); 
      formData.append('pays', this.mycount); 


   

    this.accountService.upload(formData,this.user?.id_agent).subscribe((event: HttpEvent<any> ) =>{
      
  
        console.log(event)
  
        if(event.type==HttpEventType.Response)
        { 
          this.isLoading=false;

          console.log(this.isLoading)
     
            console.log(event.body)

            let data=event.body;

      if(data['photo']!='')
      {
        this.user!.photo=data['photo'];
      }
        this.user!.nom=this.nom;
        this.user!.prenom=this.prenom;
        this.user!.num_cni=this.num_cni;
        this.user!.pays=this.mycount 
        
        encryptStorage.setItem("user",this.user);
   
   
   
      console.log(encryptStorage.getItem("user"));




       // this.userService.setUser(this.user)
        
        this.myUserService.user.next(this.user);
        
       

            this.changeDetectorRef.detectChanges();



         

        }

     
       // console.log(data)

      

      })

 
// @ts-ignore: Object is possibly 'null'.



  }
}


