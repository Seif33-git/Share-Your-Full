import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entite} from "../model/entite";
import {AppConfigService} from "../app-config.service";
@Injectable({
  providedIn: 'root'
})
export class EntiteHttpService {

  entites: Array<Entite>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Entite> {
    return this.entites;
  }

  findById(id: number): Observable<Entite> {
    return this.http.get<Entite>(this.appConfig.backEndUrl + "entite/" + id);
  }

  create(entite: Entite) {

    this.http.post<Entite>(this.appConfig.backEndUrl + "entite", entite).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(entite: Entite): Observable<Entite> {

    return this.http.put<Entite>(this.appConfig.backEndUrl + "entite/" + entite.id, entite);

  }

  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "entite/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Entite>>(this.appConfig.backEndUrl + "entite").subscribe(resp => {
      this.entites = resp;
    }, error => console.log(error))
  }
}
