import { Injectable } from '@angular/core';
import {ProduitLot} from "../model/produitLot";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProduitLotHttpService {

  produitLots: Array<ProduitLot>;

  constructor(private http: HttpClient,  private appConfig: AppConfigService) {
    this.load(); }

  findAll(): Array<ProduitLot> {
    return this.produitLots;
  }

  findById(id: number): Observable<ProduitLot> {
    return this.http.get<ProduitLot>(this.appConfig.backEndUrl + "produitLot/" + id);
  }

  create(produitLot: ProduitLot) {

    this.http.post<ProduitLot>(this.appConfig.backEndUrl + "produitLot", produitLot).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(produitLot: ProduitLot): Observable<ProduitLot> {
    return this.http.put<ProduitLot>(this.appConfig.backEndUrl + "produitLot/" + produitLot.id, produitLot);
  }

  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "produitLot/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<ProduitLot>>(this.appConfig.backEndUrl + "produitLot").subscribe(resp => {
      this.produitLots = resp;
    }, error => console.log(error))
  }
}
