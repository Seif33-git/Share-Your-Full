import { Component, OnInit } from '@angular/core';
import {Lot} from "../model/lot";
import {LotHttpService} from "../services/lot.service";

@Component({
  selector: 'app-page-beneficiaire',
  templateUrl: './page-beneficiaire.component.html',
  styleUrls: ['./page-beneficiaire.component.scss']
})
export class PageBeneficiaireComponent implements OnInit {
  lots: Array<Lot>;
  valeur:string = "";
  constructor(private lotservice: LotHttpService) { }

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
}
