import { Component, OnInit } from '@angular/core';
import {LotHttpService} from "../services/lot.service";
import {dashboardGiverDTO} from "../model/dashboardGiverDTO";
import {Don} from "../model/don";

@Component({
  selector: 'app-tableau-de-bord-donneur',
  templateUrl: './tableau-de-bord-donneur.component.html',
  styleUrls: ['./tableau-de-bord-donneur.component.scss']
})
export class TableauDeBordDonneurComponent implements OnInit {

  constructor(private lotservice: LotHttpService) { }

  listDashboardDonneur: Array<dashboardGiverDTO>;
  historique: Don = null;

  ngOnInit(): void {
    this.ListLotDashboard();
    console.log(this.listDashboardDonneur);
  }

  ListLotDashboard(){
    this.lotservice.listLotDashboardDonneur(Number(sessionStorage.getItem("idEntite"))).subscribe(
      resp=> {this.listDashboardDonneur = resp}
    );
  }

  afficheHistorique() {
    this.historique = new Don();
  }


}
