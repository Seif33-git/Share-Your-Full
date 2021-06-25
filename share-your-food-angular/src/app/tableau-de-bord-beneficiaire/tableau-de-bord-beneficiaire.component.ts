import { Component, OnInit } from '@angular/core';
import {LotHttpService} from "../services/lot.service";
import {Lot} from "../model/lot";
import {Demande} from "../model/demande";

@Component({
  selector: 'app-tableau-de-bord-beneficiaire',
  templateUrl: './tableau-de-bord-beneficiaire.component.html',
  styleUrls: ['./tableau-de-bord-beneficiaire.component.scss']
})
export class TableauDeBordBeneficiaireComponent implements OnInit {

  constructor(private lotservice: LotHttpService) { }
  lotAccByEntite: Array<Demande>;
  ngOnInit(): void {
    this.listlotTDBB();
  }
  listlotTDBB(){
   this.lotservice.listLotAccByEntite(Number(sessionStorage.getItem("idEntite"))).subscribe(
  resp=> {this.lotAccByEntite = resp}
    );
  }
}
