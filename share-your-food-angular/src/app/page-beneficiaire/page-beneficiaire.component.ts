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
  lotsDispo: Array<Lot> = new Array<Lot>();

  constructor(private lotservice: LotHttpService, private demandeservice: DemandeHttpService  ) { }

  ngOnInit(): void {
    this.load();
    this.ChargementListLot();


  }

  load(){

  }

  ChargementListLot(){

    return this.lotservice.findAllDispo().subscribe(resp => {
      this.lotsDispo = resp;
      console.log(this.lotsDispo)
    }, error => console.log(error))
   }

  ReductionListLot(valeur: string) {
    //console.log(this.lotsDispo)
  if (this.valeur!=""){
    return this.lotsDispo.filter(lot => lot.nom.indexOf(valeur)!==-1);
  }else {
    return this.lotsDispo;
  };
  }

  demander(lot:Lot){
  this.demande = new Demande("EN_ATTENTE", lot,JSON.parse(sessionStorage.getItem("utilisateur")).entite)
   this.demandeservice.create(this.demande);

  }
}
