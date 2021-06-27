import { Component, OnInit } from '@angular/core';
import {Lot} from "../model/lot";
import {Don} from "../model/don";
import {LotHttpService} from "../services/lot.service";

@Component({
  selector: 'app-page-donneur',
  templateUrl: './page-donneur.component.html',
  styleUrls: ['./page-donneur.component.scss']
})
export class PageDonneurComponent implements OnInit {

  listLotNonDonneByEntite: Array<Lot>;
  historique: Don = null;

  constructor(private lotService: LotHttpService) { }

  ngOnInit(): void {
    this.listLotNonDonne()
  }

  listLot(): Array<Lot> {
    return this.lotService.findAll();
  }

  listLotNonDonne(){
    this.lotService.listLotNonDonneByEntite(Number(sessionStorage.getItem("idEntite"))).subscribe(
      resp=> {this.listLotNonDonneByEntite = resp},
        error => console.log(error));
  }

  delete(id: number) {
    this.lotService.deleteById(id);
  }

  afficheHistorique() {
    this.historique = new Don();
  }

}
