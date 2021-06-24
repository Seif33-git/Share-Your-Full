import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produit} from "../model/produit";
@Injectable({
  providedIn: 'root'
})
export class ProduitHttpService {

  produits: Array<Produit>;

  constructor(private http: HttpClient) {
    this.load()
  }

  findAll(): Array<Produit> {
    return this.produits;
  }

  findById(id: number): Observable<Produit> {
    return this.http.get<Produit>("http://localhost:8080/rest/produit/" + id);
  }

  create(produit: Produit) {
    if(produit.evaluation && !produit.evaluation.id) {
      produit.evaluation = null;
    }
    this.http.post<Produit>("http://localhost:8080/rest/produit", produit).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(produit: Produit): Observable<Produit> {
    if(produit.evaluation && !produit.evaluation.id) {
      produit.evaluation = null;
    }
    return this.http.put<Produit>("http://localhost:8080/rest/produit/" + produit.id, produit);

  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/rest/produit/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Produit>>("http://localhost:8080/rest/produit").subscribe(resp => {
      this.produits = resp;
    }, error => console.log(error))
  }
}
