import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../model/utilisateur";
import {Lot} from "../model/lot";
import {Don} from "../model/don";
import {LotHttpService} from "../services/lot.service";
import {ParticulierHttpService} from "../services/particulier.service";
import {Particulier} from "../model/particulier";
import {UtilisateurHttpService} from "../services/utilisateur.service";

@Component({
  selector: 'app-accueil2',
  templateUrl: './accueil2.component.html',
  styleUrls: ['./accueil2.component.scss']
})
export class Accueil2Component implements OnInit {

  listLotDispoEnAttenteByEntite: Array<Lot>;
  changeB : boolean = false;
  changeD : boolean = false;


  constructor(private lotService: LotHttpService, private particulierService: ParticulierHttpService, private utilisateurService: UtilisateurHttpService) { }

  ngOnInit(): void {
    this.listLotDispoEnAttente();
    // this.initialisationDonnePivot();
  }

  recupPseudo() {
    return  JSON.parse(sessionStorage.getItem("utilisateur")).pseudo;
  }

  recupMail() {
    return  JSON.parse(sessionStorage.getItem("utilisateur")).mail;
  }

  recupBeneficiaire() {
    return  JSON.parse(sessionStorage.getItem("utilisateur")).entite.beneficiaire;
  }

  recupDonneur() {
    return  JSON.parse(sessionStorage.getItem("utilisateur")).entite.donneur;
  }

  changeOnBeneficiaire() {
   // this.particulierService.findById(JSON.parse(sessionStorage.getItem("utilisateur")).entite.id).subscribe(resp=>{this.particulierChange=resp;
   //   console.log(this.particulierChange.id);
   // });
   // if (this.particulierChange) {
   //   this.particulierChange.beneficiaire = !JSON.parse(sessionStorage.getItem("utilisateur")).entite.beneficiaire;
   //   this.particulierChange.donneur = !this.particulierChange.beneficiaire;
   //   this.utilisateurChange.entite=this.particulierChange;
   //   console.log("BENEF: " + this.particulierChange.beneficiaire);
   //   console.log("DONNEUR: " + this.particulierChange.donneur);
   //   this.particulierService.modify(this.particulierChange);
   //   sessionStorage.setItem("utilisateur",JSON.stringify( this.utilisateurChange));
   // }
  }

  listLotDispoEnAttente() {
    this.lotService.listLotDispoEnAttenteByEntite(Number(sessionStorage.getItem("idEntite"))).subscribe(resp => {
      this.listLotDispoEnAttenteByEntite = resp
    }, error => console.log(error));
  }

  // recupParticulier() {
  //   console.log("Entite ID : "+(JSON.parse(sessionStorage.getItem("utilisateur")).entite.id));
  //   // this.particulierService.findById(JSON.parse(sessionStorage.getItem("utilisateur")).entite.id).subscribe(resp => {
  //   //   this.particulierRead = resp
  //   // }, error => console.log(error));
  // }



  tableauDeBordB() {
    this.changeB=true;
  }

  tableauDeBordD() {
    this.changeD=true;
  }

  // initialisationDonnePivot() {
  //   if(!sessionStorage.getItem("pivot")) {
  //     console.log("UTILISATEUR  "+sessionStorage.getItem("utilisateur"));
  //     sessionStorage.setItem("pivot",JSON.parse(sessionStorage.getItem("utilisateur")).entite.donneur);
  //   }
  // }

  recupPivot() {
    return sessionStorage.getItem("pivot");
  }

  changePivot() {
    if (sessionStorage.getItem("pivot") == "true") {
    sessionStorage.setItem("pivot","false");
  } else {
      sessionStorage.setItem("pivot","true");
    }
  }

}
