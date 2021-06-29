import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lot} from "../model/lot";
import {AppConfigService} from "../app-config.service";
import {Demande} from "../model/demande";
import {dashboardGiverDTO} from "../model/dashboardGiverDTO";
import {dashboardBeneficiaireDTO} from "../model/dashboardBeneficiaireDTO";
@Injectable({
  providedIn: 'root'
})
export class LotHttpService {

  lots: Array<Lot>;
  grosLots: Array<Lot>;
  statuts: Array<string>;
  lotsDispo:Array<Lot>;

  constructor(private http: HttpClient,  private appConfig: AppConfigService) {
    this.load();
    this.loadGrosLot();
    this.loadLotDispo();
  }

  listLotDashboardDonneur(idEntite: number): Observable<Array<dashboardGiverDTO>>{
    return this.http.get<Array<dashboardGiverDTO>>(this.appConfig.backEndUrl + "lot/dashboard-donneur-disponible/"+idEntite)
  }

  listLotDashboardDonneurReserve(idEntite: number): Observable<Array<dashboardGiverDTO>>{
    return this.http.get<Array<dashboardGiverDTO>>(this.appConfig.backEndUrl + "lot/dashboard-donneur-reserve/"+idEntite)
  }

  listLotDashboardDonneurDonne(idEntite: number): Observable<Array<dashboardGiverDTO>>{
    return this.http.get<Array<dashboardGiverDTO>>(this.appConfig.backEndUrl + "lot/dashboard-donneur-donne/"+idEntite)
  }

  listLotAccByEntite(idEntite: number): Observable<Array<dashboardBeneficiaireDTO>>{
   return this.http.get<Array<dashboardBeneficiaireDTO>>(this.appConfig.backEndUrl + "demande/TableaudeBordBeneficiaire/"+idEntite)
  }

  listLotNonDonneByEntite(idEntite: number): Observable<Array<Lot>>{
    return this.http.get<Array<Lot>>(this.appConfig.backEndUrl + "lot/non-donne-by-entite/"+idEntite)
  }



  listLotByDonId(idDon: number): Observable<Array<Lot>>{
    return this.http.get<Array<Lot>>(this.appConfig.backEndUrl + "lot/lot-by-don/"+idDon)
  }

  listLotDispoEnAttenteByEntite(idEntite: number): Observable<Array<Lot>>{
    return this.http.get<Array<Lot>>(this.appConfig.backEndUrl + "lot/attente-by-entite/"+idEntite)
  }

  compteurLot(): Observable<number> {
    return this.http.get<number>(this.appConfig.backEndUrl + "lot/count-lots");
  }

  findGrosLot(): Array<Lot>{

    return this.grosLots;
  }

  findAll(): Array<Lot> {
    return this.lots;
  }

  findById(id: number): Observable<Lot> {
    return this.http.get<Lot>(this.appConfig.backEndUrl + "lot/" + id);
  }

  create(lot: Lot) {

    this.http.post<Lot>(this.appConfig.backEndUrl + "lot", lot).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(lot: Lot): Observable<Lot> {
    return this.http.put<Lot>(this.appConfig.backEndUrl + "lot/" + lot.id, lot);
  }




  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "lot/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Lot>>(this.appConfig.backEndUrl + "lot").subscribe(resp => {
      this.lots = resp;
    }, error => console.log(error))
    this.appConfig.findAllStatut().subscribe(resp => {
      this.statuts = resp;
    }, error => console.log(error));
  }
  loadGrosLot(){
    this.http.get<Array<Lot>>(this.appConfig.backEndUrl + "lot/tri-par-volume").subscribe(resp => {
      this.grosLots = resp;
    }, error => console.log(error))
  }
  loadLotDispo(){
    this.http.get<Array<Lot>>(this.appConfig.backEndUrl + "lot/lot-dispo").subscribe(resp => {
      this.lotsDispo = resp;
    }, error => console.log(error))
  }
  findAllDispo(): Array<Lot>{
    return this.lotsDispo;
  }
}
