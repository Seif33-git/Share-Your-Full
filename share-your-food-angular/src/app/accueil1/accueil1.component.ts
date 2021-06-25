import { Component, OnInit } from '@angular/core';
import {Lot} from "../model/lot";
import {LotHttpService} from "../services/lot.service";

@Component({
  selector: 'app-accueil1',
  templateUrl: './accueil1.component.html',
  styleUrls: ['./accueil1.component.scss']
})
export class Accueil1Component implements OnInit {
  compteurlot:number;
  constructor(private lotService: LotHttpService) {
    this.nbrLotDonne();
  }

  ngOnInit(): void {
  }

  listGrosLot(): Array<Lot> {
    return this.lotService.findGrosLot();
  }
  nbrLotDonne() {
   this.lotService.compteurLot().subscribe(resp => {
     this.compteurlot = resp;
   }, error => console.log(error));
  }
}
