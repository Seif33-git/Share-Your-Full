import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produit} from "../model/produit";
import {AppConfigService} from "../app-config.service";
@Injectable({
  providedIn: 'root'
})
export class ProduitHttpService {

  produits: Array<Produit>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Produit> {
    return this.produits;
  }

  findById(id: number): Observable<Produit> {
    return this.http.get<Produit>(this.appConfig.backEndUrl + "produit/" + id);
  }

  create(produit: Produit) {

    this.http.post<Produit>(this.appConfig.backEndUrl + "produit", produit).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(produit: Produit): Observable<Produit> {

    return this.http.put<Produit>(this.appConfig.backEndUrl + "produit/" + produit.id, produit);

  }

  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "produit/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Produit>>(this.appConfig.backEndUrl + "produit").subscribe(resp => {
      this.produits = resp;
    }, error => console.log(error))
  }
}
