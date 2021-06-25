import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lot} from "../model/lot";
import {AppConfigService} from "../app-config.service";
import {Demande} from "../model/demande";
@Injectable({
  providedIn: 'root'
})
export class LotHttpService {

  lots: Array<Lot>;
  grosLots: Array<Lot>;
  constructor(private http: HttpClient,private appConfig: AppConfigService) {
    this.load();
    this.loadGrosLot();
  }
  listLotAccByEntite(idEntite: number): Observable<Array<Demande>>{
   return this.http.get<Array<Demande>>(this.appConfig.backEndUrl + "demande/list-lot-demande/"+idEntite)
  }

  compteurLot(): Observable<number> {
    return this.http.get<number>("http://localhost:8080/lot/count-lots");
  }

  findGrosLot(): Array<Lot>{

    return this.grosLots;
  }

  findAll(): Array<Lot> {
    return this.lots;
  }

  findById(id: number): Observable<Lot> {
    return this.http.get<Lot>("http://localhost:8080/lot/" + id);
  }

  create(lot: Lot) {

    this.http.post<Lot>("http://localhost:8080/lot", lot).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(lot: Lot): Observable<Lot> {

    return this.http.put<Lot>("http://localhost:8080/lot/" + lot.id, lot);

  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/lot/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Lot>>("http://localhost:8080/lot").subscribe(resp => {
      this.lots = resp;
    }, error => console.log(error))
  }
  loadGrosLot(){
    this.http.get<Array<Lot>>("http://localhost:8080/lot/tri-par-volume").subscribe(resp => {
      this.grosLots = resp;
    }, error => console.log(error))
  }
}
