import { Component, OnInit } from '@angular/core';
import {LotHttpService} from "../services/lot.service";
import {dashboardGiverDTO} from "../model/dashboardGiverDTO";
import {Don} from "../model/don";
import {DemandeHttpService} from "../services/demande.service";
import {Lot} from "../model/lot";
import {Demande} from "../model/demande";

@Component({
  selector: 'app-tableau-de-bord-donneur',
  templateUrl: './tableau-de-bord-donneur.component.html',
  styleUrls: ['./tableau-de-bord-donneur.component.scss']
})
export class TableauDeBordDonneurComponent implements OnInit {

  constructor(private lotservice: LotHttpService, private demandeService: DemandeHttpService) { }

  listDashboardDonneur: Array<dashboardGiverDTO>;
  lotCourant: Lot;
  demandeCourante: Demande;
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

  Accepter(idLot: number){
    this.demandeService.accepterDemandeByLotId(idLot);

  }


  afficheHistorique() {
    this.historique = new Don();
  }


}
