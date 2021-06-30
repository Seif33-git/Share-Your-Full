import { Component, OnInit } from '@angular/core';
import {Lot} from "../model/lot";
import {LotHttpService} from "../services/lot.service";
import {DemandeHttpService} from "../services/demande.service";
import {Demande} from "../model/demande";

@Component({
  selector: 'app-page-beneficiaire',
  templateUrl: './page-beneficiaire.component.html',
  styleUrls: ['./page-beneficiaire.component.scss']
})
export class PageBeneficiaireComponent implements OnInit {
  lots: Array<Lot>;
  valeur:string = "";
  demande: Demande;
  constructor(private lotservice: LotHttpService, private demandeservice: DemandeHttpService  ) { }

  ngOnInit(): void {
    this.load()
  }

  load(){

  }

  ReductionListLot(valeur:string){
    if (this.valeur!=""){
    return this.lotservice.findAllDispo().filter(lot => lot.nom.indexOf(valeur)!==-1);}
    else {
      return this.lotservice.findAllDispo();
    }
  }
  demander(lot:Lot){
  this.demande = new Demande("EN_ATTENTE", lot,JSON.parse(sessionStorage.getItem("utilisateur")).entite)
   this.demandeservice.create(this.demande);

  }
}
