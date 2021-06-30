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
  listDashboardDonneurReserve: Array<dashboardGiverDTO>;
  listDashboardDonneurDonne: Array<dashboardGiverDTO>;
  lotCourant: Lot;
  demandeCourante: Demande;
  historique: Don = null;

  ngOnInit(): void {
    this.ListLotDashboard();
    this.ListLotDashboardDonne();
    this.ListLotDashboardReserve();
  }

  ListLotDashboard(){
    this.lotservice.listLotDashboardDonneur(Number(sessionStorage.getItem("idEntite"))).subscribe(
      resp=> {this.listDashboardDonneur = resp}
    );
  }

  ListLotDashboardReserve(){
    this.lotservice.listLotDashboardDonneurReserve(Number(sessionStorage.getItem("idEntite"))).subscribe(
      resp=> {this.listDashboardDonneurReserve = resp}
    );
  }

  ListLotDashboardDonne(){
    this.lotservice.listLotDashboardDonneurDonne(Number(sessionStorage.getItem("idEntite"))).subscribe(
      resp=> {this.listDashboardDonneurDonne = resp}
    );
  }

  // Accepter(idLot: number){
  //   this.demandeService.accepterDemandeByLotId(idLot);
  // }

  Accepter(idLot: number){
    this.demandeService.accepterDemandeByLotId(idLot).subscribe(resp => {
      this.ListLotDashboard();
      this.ListLotDashboardDonne();
      this.ListLotDashboardReserve();
      }, error => console.log(error));
  }

  Refuser(idLot: number){
    this.demandeService.refuserDemandeByLotId(idLot).subscribe(resp => {
      this.ListLotDashboard();
      this.ListLotDashboardDonne();
      this.ListLotDashboardReserve();
    }, error => console.log(error));
  }

  Annuler(idLot: number){
    this.demandeService.annulerDemandeByLotId(idLot).subscribe(resp => {
      this.ListLotDashboard();
      this.ListLotDashboardDonne();
      this.ListLotDashboardReserve();
    }, error => console.log(error));
  }

  Donner(idLot: number){
    this.demandeService.donnerLotByLotId(idLot).subscribe(resp => {
      this.ListLotDashboard();
      this.ListLotDashboardDonne();
      this.ListLotDashboardReserve();
    }, error => console.log(error));
  }


  afficheHistorique() {
    this.historique = new Don();
  }


}
