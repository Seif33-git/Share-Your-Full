import { Component, OnInit } from '@angular/core';
import {LotHttpService} from "../services/lot.service";
import {Lot} from "../model/lot";
import {Demande} from "../model/demande";
import {DemandeHttpService} from "../services/demande.service";
import {dashboardBeneficiaireDTO} from "../model/dashboardBeneficiaireDTO";

@Component({
  selector: 'app-tableau-de-bord-beneficiaire',
  templateUrl: './tableau-de-bord-beneficiaire.component.html',
  styleUrls: ['./tableau-de-bord-beneficiaire.component.scss']
})
export class TableauDeBordBeneficiaireComponent implements OnInit {

  constructor(private lotservice: LotHttpService, private demandeService: DemandeHttpService) { }
  demandeAccByEntite: Array<dashboardBeneficiaireDTO>;
  demandeHist: Array<dashboardBeneficiaireDTO>;
  ngOnInit(): void {
    this.listlotTDBB();
    this.listHistTDBB();

  }
  listlotTDBB(){
   this.lotservice.listLotAccByEntite(Number(sessionStorage.getItem("idEntite"))).subscribe(
  resp=> {this.demandeAccByEntite = resp}
    );
  }
  listHistTDBB(){
    this.demandeService.listDemandeHistByEntite(Number(sessionStorage.getItem("idEntite"))).subscribe(
      resp=> {this.demandeHist = resp}
    );
  }

  trouverDonneur(id : number):string{
    this.demandeService.trouverNomEntite(id);
    return this.demandeService.NomEntiteByDemandeId;
  }

}
