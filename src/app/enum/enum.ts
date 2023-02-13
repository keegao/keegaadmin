import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs/internal/observable/throwError";
import { encryptStorage } from "../services/helper"

export class APIURL{
    //url = "https://ouicareapp.asta.cm/",

	//return "http://192.168.163.1/OuiCare/";
    //return "http://ottouleo.projetumojaddfe.cm/";
    
 

    static url :any="http://localhost/keegao/api/";
    
static url2 ="http://localhost/keegao/"

//static url2 ="https://app.keegao.com/"

//static url :any="https://app.keegao.com/api/";
    




static url3=""

   
 // url = "http://localhost/OuiCareh/",

 //url = "http://169.254.23.213/OuiCareh/",
 static  emai_regex='^[A-Z0-9a-z\\._%+-]+@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$'
 static  mp_reqex='^.*(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%]+$'



   


    

//url="http://192.168.43.69/OuiCareh/"











}

export class M{
 static countrie =[
    {"name":"Afghanistan","code":"AF"},
    {"name":"Iles Aland","code":"AX"},
    {"name":"Albanie","code":"AL"},
    {"name":"Algérie","code":"DZ"},
    {"name":"Samoa américaines","code":"AS"},
    {"name":"Andorre","code":"AD"},
    {"name":"L'Angola","code":"AO"},
    {"name":"Anguilla","code":"AI"},
    {"name":"Antarctique","code":"AQ"},
    {"name":"Antigua-et-Barbuda","code":"AG"},
    {"name":"Argentine","code":"AR"},
    {"name":"Arménie","code":"AM"},
    {"name":"Aruba","code":"AW"},
    {"name":"Australie","code":"AU"},
    {"name":"L'Autriche","code":"AT"},
    {"name":"Azerbaïdjan","code":"AZ"},
    {"name":"Bahamas","code":"BS"},
    {"name":"Bahreïn","code":"BH"},
    {"name":"Bangladesh","code":"BD"},
    {"name":"Barbade","code":"BB"},
    {"name":"Biélorussie","code":"BY"},
    {"name":"Belgique","code":"BE"},
    {"name":"Belize","code":"BZ"},
    {"name":"Bénin","code":"BJ"},
    {"name":"Bermudes","code":"BM"},
    {"name":"Bhoutan","code":"BT"},
    {"name":"Bolivie","code":"BO"},
    {"name":"Bonaire, Saint-Eustache et Saba","code":"BQ"},
    {"name":"Bosnie Herzégovine","code":"BA"},
    {"name":"Botswana","code":"BW"},
    {"name":"Île Bouvet","code":"BV"},
    {"name":"Brésil","code":"BR"},
    {"name":"Territoire britannique de l'océan Indien","code":"IO"},
    {"name":"Brunei Darussalam","code":"BN"},
    {"name":"Bulgarie","code":"BG"},
    {"name":"Burkina Faso","code":"BF"},
    {"name":"Burundi","code":"BI"},
    {"name":"Cambodge","code":"KH"},
    {"name":"Cameroun","code":"CM"},
    {"name":"Canada","code":"CA"},
    {"name":"Cap-Vert","code":"CV"},
    {"name":"Îles Caïmans","code":"KY"},
    {"name":"République centrafricaine","code":"CF"},
    {"name":"Tchad","code":"TD"},
    {"name":"Chili","code":"CL"},
    {"name":"Chine","code":"CN"},
    {"name":"L'île de noël","code":"CX"},
    {"name":"Îles Cocos (Keeling)","code":"CC"},
    {"name":"Colombie","code":"CO"},
    {"name":"Comores","code":"KM"},
    {"name":"Congo","code":"CG"},
    {"name":"Congo, République démocratique du Congo","code":"CD"},
    {"name":"les Îles Cook","code":"CK"},
    {"name":"Costa Rica","code":"CR"},
    {"name":"Côte d'Ivoire","code":"CI"},
    {"name":"Croatie","code":"HR"},
    {"name":"Cuba","code":"CU"},
    {"name":"Curacao","code":"CW"},
    {"name":"Chypre","code":"CY"},
    {"name":"République Tchèque","code":"CZ"},
    {"name":"Danemark","code":"DK"},
    {"name":"Djibouti","code":"DJ"},
    {"name":"Dominique","code":"DM"},
    {"name":"République dominicaine","code":"DO"},
    {"name":"Equateur","code":"EC"},
    {"name":"Egypte","code":"EG"},
    {"name":"Le Salvador","code":"SV"},
    {"name":"Guinée Équatoriale","code":"GQ"},
    {"name":"Érythrée","code":"ER"},
    {"name":"Estonie","code":"EE"},
    {"name":"Ethiopie","code":"ET"},
    {"name":"Îles Falkland (Malvinas)","code":"FK"},
    {"name":"Îles Féroé","code":"FO"},
    {"name":"Fidji","code":"FJ"},
    {"name":"Finlande","code":"FI"},
    {"name":"France","code":"FR"},
    {"name":"Guyane Française","code":"GF"},
    {"name":"Polynésie française","code":"PF"},
    {"name":"Terres australes françaises","code":"TF"},
    {"name":"Gabon","code":"GA"},
    {"name":"Gambie","code":"GM"},
    {"name":"Géorgie","code":"GE"},
    {"name":"Allemagne","code":"DE"},
    {"name":"Ghana","code":"GH"},
    {"name":"Gibraltar","code":"GI"},
    {"name":"Grèce","code":"GR"},
    {"name":"Groenland","code":"GL"},
    {"name":"Grenade","code":"GD"},
    {"name":"Guadeloupe","code":"GP"},
    {"name":"Guam","code":"GU"},
    {"name":"Guatemala","code":"GT"},
    {"name":"Guernesey","code":"GG"},
    {"name":"Guinée","code":"GN"},
    {"name":"Guinée-Bissau","code":"GW"},
    {"name":"Guyane","code":"GY"},
    {"name":"Haïti","code":"HT"},
    {"name":"Îles Heard et McDonald","code":"HM"},
    {"name":"Saint-Siège (État de la Cité du Vatican)","code":"VA"},
    {"name":"Honduras","code":"HN"},
    {"name":"Hong Kong","code":"HK"},
    {"name":"Hongrie","code":"HU"},
    {"name":"Islande","code":"IS"},
    {"name":"Inde","code":"IN"},
    {"name":"Indonésie","code":"ID"},
    {"name":"Iran (République islamique d","code":"IR"},
    {"name":"Irak","code":"IQ"},
    {"name":"Irlande","code":"IE"},
    {"name":"île de Man","code":"IM"},
    {"name":"Israël","code":"IL"},
    {"name":"Italie","code":"IT"},
    {"name":"Jamaïque","code":"JM"},
    {"name":"Japon","code":"JP"},
    {"name":"Jersey","code":"JE"},
    {"name":"Jordan","code":"JO"},
    {"name":"Kazakhstan","code":"KZ"},
    {"name":"Kenya","code":"KE"},
    {"name":"Kiribati","code":"KI"},
    {"name":"République populaire démocratique de Corée","code":"KP"},
    {"name":"Corée, République de","code":"KR"},
    {"name":"Kosovo","code":"XK"},
    {"name":"Koweit","code":"KW"},
    {"name":"Kirghizistan","code":"KG"},
    {"name":"République démocratique populaire lao","code":"LA"},
    {"name":"Lettonie","code":"LV"},
    {"name":"Liban","code":"LB"},
    {"name":"Lesotho","code":"LS"},
    {"name":"Libéria","code":"LR"},
    {"name":"Jamahiriya arabe libyenne","code":"LY"},
    {"name":"Liechtenstein","code":"LI"},
    {"name":"Lituanie","code":"LT"},
    {"name":"Luxembourg","code":"LU"},
    {"name":"Macao","code":"MO"},
    {"name":"Macédoine, ancienne République yougoslave de","code":"MK"},
    {"name":"Madagascar","code":"MG"},
    {"name":"Malawi","code":"MW"},
    {"name":"Malaisie","code":"MY"},
    {"name":"Maldives","code":"MV"},
    {"name":"Mali","code":"ML"},
    {"name":"Malte","code":"MT"},
    {"name":"Iles Marshall","code":"MH"},
    {"name":"Martinique","code":"MQ"},
    {"name":"Mauritanie","code":"MR"},
    {"name":"Ile Maurice","code":"MU"},
    {"name":"Mayotte","code":"YT"},
    {"name":"Mexique","code":"MX"},
    {"name":"Micronésie, États fédérés de","code":"FM"},
    {"name":"Moldova, République de","code":"MD"},
    {"name":"Monaco","code":"MC"},
    {"name":"Mongolie","code":"MN"},
    {"name":"Monténégro","code":"ME"},
    {"name":"Montserrat","code":"MS"},
    {"name":"Maroc","code":"MA"},
    {"name":"Mozambique","code":"MZ"},
    {"name":"Myanmar","code":"MM"},
    {"name":"Namibie","code":"NA"},
    {"name":"Nauru","code":"NR"},
    {"name":"Népal","code":"NP"},
    {"name":"Pays-Bas","code":"NL"},
    {"name":"Antilles néerlandaises","code":"AN"},
    {"name":"Nouvelle Calédonie","code":"NC"},
    {"name":"Nouvelle-Zélande","code":"NZ"},
    {"name":"Nicaragua","code":"NI"},
    {"name":"Niger","code":"NE"},
    {"name":"Nigeria","code":"NG"},
    {"name":"Niue","code":"NU"},
    {"name":"l'ile de Norfolk","code":"NF"},
    {"name":"Îles Mariannes du Nord","code":"MP"},
    {"name":"Norvège","code":"NO"},
    {"name":"Oman","code":"OM"},
    {"name":"Pakistan","code":"PK"},
    {"name":"Palau","code":"PW"},
    {"name":"Territoire palestinien, occupé","code":"PS"},
    {"name":"Panama","code":"PA"},
    {"name":"Papouasie Nouvelle Guinée","code":"PG"},
    {"name":"Paraguay","code":"PY"},
    {"name":"Pérou","code":"PE"},
    {"name":"Philippines","code":"PH"},
    {"name":"Pitcairn","code":"PN"},
    {"name":"Pologne","code":"PL"},
    {"name":"Le Portugal","code":"PT"},
    {"name":"Porto Rico","code":"PR"},
    {"name":"Qatar","code":"QA"},
    {"name":"Réunion","code":"RE"},
    {"name":"Roumanie","code":"RO"},
    {"name":"Fédération Russe","code":"RU"},
    {"name":"Rwanda","code":"RW"},
    {"name":"Saint Barthélemy","code":"BL"},
    {"name":"Sainte-Hélène","code":"SH"},
    {"name":"Saint-Christophe-et-Niévès","code":"KN"},
    {"name":"Sainte-Lucie","code":"LC"},
    {"name":"Saint Martin","code":"MF"},
    {"name":"Saint-Pierre-et-Miquelon","code":"PM"},
    {"name":"Saint-Vincent-et-les-Grenadines","code":"VC"},
    {"name":"Samoa","code":"WS"},
    {"name":"Saint Marin","code":"SM"},
    {"name":"Sao Tomé et Principe","code":"ST"},
    {"name":"Arabie Saoudite","code":"SA"},
    {"name":"Sénégal","code":"SN"},
    {"name":"Serbie","code":"RS"},
    {"name":"Serbie et Monténégro","code":"CS"},
    {"name":"les Seychelles","code":"SC"},
    {"name":"Sierra Leone","code":"SL"},
    {"name":"Singapour","code":"SG"},
    {"name":"St Martin","code":"SX"},
    {"name":"Slovaquie","code":"SK"},
    {"name":"Slovénie","code":"SI"},
    {"name":"Les îles Salomon","code":"SB"},
    {"name":"Somalie","code":"SO"},
    {"name":"Afrique du Sud","code":"ZA"},
    {"name":"Géorgie du Sud et îles Sandwich du Sud","code":"GS"},
    {"name":"Soudan du sud","code":"SS"},
    {"name":"Espagne","code":"ES"},
    {"name":"Sri Lanka","code":"LK"},
    {"name":"Soudan","code":"SD"},
    {"name":"Suriname","code":"SR"},
    {"name":"Svalbard et Jan Mayen","code":"SJ"},
    {"name":"Swaziland","code":"SZ"},
    {"name":"Suède","code":"SE"},
    {"name":"la Suisse","code":"CH"},
    {"name":"République arabe syrienne","code":"SY"},
    {"name":"Taiwan, Province de Chine","code":"TW"},
    {"name":"Tadjikistan","code":"TJ"},
    {"name":"Tanzanie, République-Unie de","code":"TZ"},
    {"name":"Thaïlande","code":"TH"},
    {"name":"Timor-Leste","code":"TL"},
    {"name":"Aller","code":"TG"},
    {"name":"Tokelau","code":"TK"},
    {"name":"Tonga","code":"TO"},
    {"name":"Trinité-et-Tobago","code":"TT"},
    {"name":"Tunisie","code":"TN"},
    {"name":"dinde","code":"TR"},
    {"name":"Turkménistan","code":"TM"},
    {"name":"îles Turques-et-Caïques","code":"TC"},
    {"name":"Tuvalu","code":"TV"},
    {"name":"Ouganda","code":"UG"},
    {"name":"Ukraine","code":"UA"},
    {"name":"Emirats Arabes Unis","code":"AE"},
    {"name":"Royaume-Uni","code":"GB"},
    {"name":"États-Unis","code":"US"},
    {"name":"Îles mineures éloignées des États-Unis","code":"UM"},
    {"name":"Uruguay","code":"UY"},
    {"name":"Ouzbékistan","code":"UZ"},
    {"name":"Vanuatu","code":"VU"},
    {"name":"Venezuela","code":"VE"},
    {"name":"Viet Nam","code":"VN"},
    {"name":"Îles Vierges britanniques","code":"VG"},
    {"name":"Îles Vierges américaines, États-Unis","code":"VI"},
    {"name":"Wallis et Futuna","code":"WF"},
    {"name":"Sahara occidental","code":"EH"},
    {"name":"Yémen","code":"YE"},
    {"name":"Zambie","code":"ZM"},
    {"name":"Zimbabwe","code":"ZW"}
];

static mycountrie=Object.entries(M.countrie);

public static  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  

}