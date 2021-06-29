import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../model/utilisateur";
import {Lot} from "../model/lot";
import {Don} from "../model/don";
import {LotHttpService} from "../services/lot.service";

@Component({
  selector: 'app-accueil2',
  templateUrl: './accueil2.component.html',
  styleUrls: ['./accueil2.component.scss']
})
export class Accueil2Component implements OnInit {

  listLotDispoEnAttenteByEntite: Array<Lot>;

  constructor(private lotService: LotHttpService) { }

  ngOnInit(): void {
    this.listLotDispoEnAttente();
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

  ifBeneficiaire() {

  }

  listLotDispoEnAttente() {
    this.lotService.listLotDispoEnAttenteByEntite(Number(sessionStorage.getItem("idEntite"))).subscribe(resp => {
      this.listLotDispoEnAttenteByEntite = resp
    }, error => console.log(error));
  }

}
