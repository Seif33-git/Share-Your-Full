import { Injectable } from '@angular/core';
import {Adresse} from "../model/adresse";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Observable} from "rxjs";
import {Entreprise} from "../model/entreprise";

@Injectable({
  providedIn: 'root'
})
export class AdresseHttpService {

  adresses: Array<Adresse>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Adresse> {
    return this.adresses;
  }

  findById(id: number): Observable<Adresse> {
    return this.http.get<Adresse>(this.appConfig.backEndUrl + "adresse/" + id);
  }

  create(adresse: Adresse) {
    this.http.post<Adresse>(this.appConfig.backEndUrl + "adresse", adresse).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  createID(adresse: Adresse) {

    this.http.post<Adresse>(this.appConfig.backEndUrl + "adresse", adresse).subscribe(resp => {
      console.log("adresse ID avant : "+adresse.id);
      adresse.id=resp.id;
      console.log("adresse ID après : "+adresse.id);
      this.load();
    }, error => console.log(error));
  }

  modify(adresse: Adresse): Observable<Adresse> {
    return this.http.put<Adresse>(this.appConfig.backEndUrl + "adresse/" + adresse.id, adresse);
  }

  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "adresse/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Adresse>>(this.appConfig.backEndUrl + "adresse").subscribe(resp => {
      this.adresses = resp;
    }, error => console.log(error))
  }
}
