import {Component, OnInit} from '@angular/core';
import {Lot} from "../model/lot";
import {Don} from "../model/don";
import {LotHttpService} from "../services/lot.service";
import {DonHttpService} from "../services/don.service";
import {pageDonneurDTO} from "../model/pageDonneurDTO";

@Component({
  selector: 'app-page-donneur',
  templateUrl: './page-donneur.component.html',
  styleUrls: ['./page-donneur.component.scss']
})
export class PageDonneurComponent implements OnInit {

  listLotNonDonneByEntite: Array<Lot>;
  listDonPageDonneur: Array<pageDonneurDTO>;
  historique: Don = null;

  constructor(private lotService: LotHttpService, private donService: DonHttpService) {
  }

  ngOnInit(): void {
    this.listLotNonDonne()
    this.listDons()
  }

  listLot(): Array<Lot> {
    return this.lotService.findAll();
  }

  listLotNonDonne() {
    this.lotService.listLotNonDonneByEntite(Number(sessionStorage.getItem("idEntite"))).subscribe(
      resp => {
        this.listLotNonDonneByEntite = resp
      },
      error => console.log(error));
  }

  listDons() {
    this.donService.listDonPageDonneur(Number(sessionStorage.getItem("idEntite"))).subscribe(
      resp => {
        this.listDonPageDonneur = resp;
        console.log(this.listDonPageDonneur);
      },
      error => console.log(error));
  }

  delete(id: number) {
    this.donService.deleteById(id);
  }

  afficheHistorique() {
    this.historique = new Don();
  }

}
