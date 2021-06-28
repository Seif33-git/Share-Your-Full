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
  types: Array<string>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Produit> {
    return this.produits;
  }

  findById(nom: string): Observable<Produit> {
    return this.http.get<Produit>(this.appConfig.backEndUrl + "produit/" + nom);
  }

  create(produit: Produit) {

    this.http.post<Produit>(this.appConfig.backEndUrl + "produit", produit).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(produit: Produit): Observable<Produit> {

    return this.http.put<Produit>(this.appConfig.backEndUrl + "produit/" + produit.nom, produit);

  }

  deleteById(nom: string) {
    this.http.delete(this.appConfig.backEndUrl +  "produit/" + nom).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Produit>>(this.appConfig.backEndUrl + "produit").subscribe(resp => {
      this.produits = resp;
    }, error => console.log(error))
    this.appConfig.findAllType().subscribe(resp => {
      this.types = resp;
    }, error => console.log(error));
  }
}
