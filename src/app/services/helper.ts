import { EncryptStorage } from 'encrypt-storage';

export const encryptStorage =new EncryptStorage('jaimelinfo02@111', {prefix: '@keegao'})

export class Helper{
    // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
            static  mois(str:any)
    {
     var n=parseInt(str);
     switch(n) {
        case 1:
            return "Janvier";
    
        case 2:
            return "Fevrier";
    
        case 3:
            return "Mars";
    
        case 4:
            return "Avril";
    
        case 5:
            return "Mai";
    
        case 6:
            return "Juin";
    
        case 7:
            return "Juillet";
    
        case 8:
            return "Août";
    
    
        case 9:
            return "Septembre";
    
        case 10:
            return "Octobre";
    
    
    
        case 11:
            return "Novembre";
    
        case 12:
            return "Décembre";
    
    
        default:
            return"";
    }
    
    
    
    }
    
    static jour($jour:any)
    {
      var d = new Date($jour);
    var weekday = new Array(7);
    weekday[1] =  "Lundi";
    weekday[2] = "Mardi";
    weekday[3] = "Mercredi";
    weekday[4] = "Jeudi";
    weekday[5] = "Vendredi";
    weekday[6] = "Samedi";
    weekday[0] = "Dimanche";
    
    var n = weekday[d.getDay()];
    
    return n;
    
    }
    
    static jour2($jour:any)
    {
      var d = new Date($jour);
    
    var n = d.getDay();
    if(n==0)
    {
    n=7;
    
    }
    
    return n;
    
    }
    
    // function qui permet de mettre en forme une date
    static dateformate($date:any)
    {    if($date!=null && $date!='')
    {
    
        var ch1=$date;
        var m=ch1.slice(5,7);
        var moi=this.mois(m);
    
    return this.jour($date)+" "+ch1.slice(8)+" "+moi+" "+ch1.slice(0,4);
    
    }
    
    else
    {
        return ''
    }
    }
    
    static datemoi($date:any)
    {
    
        var ch1=$date;
        var m=ch1.slice(5,7);
        var moi=this.mois(m);
    
    return ch1.slice(8)+" "+moi
    }
    
    static dateformate2($date:any)
    {
    
        var ch1=$date;
        var m=ch1.slice(5,7);
        var moi=this.mois(m);
    
    return ch1.slice(8)+"/"+m+"/"+ch1.slice(0,4);
    }
    
    
    static heureformate($heur:any)
    {
    
        var ch1=$heur;
    
    return ch1.slice(0,5);
    }
    
    
    static mydate()
    {
    
      var currentdate = new Date(); 
      let month=("0" + (currentdate.getMonth() + 1)).slice(-2);
      let date=("0" + currentdate.getDate()).slice(-2);
    
      return   currentdate.getFullYear() +'-'+month +'-'+date
    
    }
    
    static myhour(){
    
      var currentdate = new Date(); 
    
       return + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
       
    
    
    
    
    }
    
    
    static  timediff(date:any, heure:any,nom:any)
    
    {
    
    let mot=""
    
    //let mydate2=date+" "+heure
    
                
       let mydate2=date.replace(/-/g, "/")
    
       let dat1=new Date(mydate2)
       let dat2=new Date()
    
    /*    console.log(dat1.toDateString()+""+nom)
       console.log(dat2.toDateString()+""+nom)
     */
    
    
       let yesterday=new Date(new Date().setDate(dat2.getDate()-1));
    
    /*    console.log(yesterday.toDateString()) */
    
       
    
    if(dat1.getFullYear()!=dat2.getFullYear())
    {
    
        //mot=date
    
        // pas la meme anne on affiche la date complete
    
        mot=this.dateformate2(date)
    }
    
    
    else
    {
     if(dat1.toDateString()==dat2.toDateString())
    {
     // le m$eme jour
        
        mot=this.heureformate(heure)
     }
    
     else if(dat1.toDateString()==yesterday.toDateString())
      
      {
           // hier
    
        mot="Hier"
      }
    
      else{
      mot=this.datemoi(date)
    
      }
    
    
    }
    
    
    
    
    
    
    
    return mot
    
    
    
    
    
    }
    
    
    static randomString(length:number)
    {
        let text = "";
        let possible="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
          return text;



    }
    
    
    
    
    
    }