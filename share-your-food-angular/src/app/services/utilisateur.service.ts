import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../model/utilisateur";
import {AppConfigService} from "../app-config.service";
import {Entreprise} from "../model/entreprise";
@Injectable({
  providedIn: 'root'
})
export class UtilisateurHttpService {

  utilisateurs: Array<Utilisateur>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Utilisateur> {
    return this.utilisateurs;
  }

  findById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.appConfig.backEndUrl + "utilisateur/" + id);
  }

  create(utilisateur: Utilisateur) {

    this.http.post<Utilisateur>(this.appConfig.backEndUrl + "utilisateur", utilisateur).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  createID(utilisateur: Utilisateur) {

    this.http.post<Utilisateur>(this.appConfig.backEndUrl + "utilisateur", utilisateur).subscribe(resp => {
      console.log("utilisateur ID avant : "+utilisateur.id);
      utilisateur.id=resp.id;
      console.log("utilisateur ID après : "+utilisateur.id);
      this.load();
    }, error => console.log(error));
  }

  modify(utilisateur: Utilisateur): Observable<Utilisateur> {

    return this.http.put<Utilisateur>(this.appConfig.backEndUrl + "utilisateur/" + utilisateur.id, utilisateur);

  }

  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "utilisateur/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Utilisateur>>(this.appConfig.backEndUrl + "utilisateur").subscribe(resp => {
      this.utilisateurs = resp;
    }, error => console.log(error))
  }
}
