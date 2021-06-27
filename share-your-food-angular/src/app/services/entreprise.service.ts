import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entreprise} from "../model/entreprise";
import {AppConfigService} from "../app-config.service";
import {Particulier} from "../model/particulier";
@Injectable({
  providedIn: 'root'
})
export class EntrepriseHttpService {

  entreprises: Array<Entreprise>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Entreprise> {
    return this.entreprises;
  }

  findById(id: number): Observable<Entreprise> {
    return this.http.get<Entreprise>(this.appConfig.backEndUrl + "entreprise/" + id);
  }

  create(entreprise: Entreprise) {

    this.http.post<Entreprise>(this.appConfig.backEndUrl + "entreprise", entreprise).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  createID(entreprise: Entreprise) {

    this.http.post<Entreprise>(this.appConfig.backEndUrl + "entreprise", entreprise).subscribe(resp => {
      console.log(entreprise.id);
      entreprise.id=resp.id;
      console.log(entreprise.id);
      this.load();
    }, error => console.log(error));
  }

  modify(entreprise: Entreprise): Observable<Entreprise> {

    return this.http.put<Entreprise>(this.appConfig.backEndUrl + "entreprise/" + entreprise.id, entreprise);

  }

  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "entreprise/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Entreprise>>(this.appConfig.backEndUrl + "entreprise").subscribe(resp => {
      this.entreprises = resp;
    }, error => console.log(error))
  }
}
