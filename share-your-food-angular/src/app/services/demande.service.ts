import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Demande} from "../model/demande";
import {AppConfigService} from "../app-config.service";
@Injectable({
  providedIn: 'root'
})
export class DemandeHttpService {

  demandes: Array<Demande>;
  NomEntiteByDemandeId : string;
  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Demande> {
    return this.demandes;
  }

  findById(id: number): Observable<Demande> {
    return this.http.get<Demande>(this.appConfig.backEndUrl + "demande/" + id);
  }

  create(demande: Demande) {

    this.http.post<Demande>(this.appConfig.backEndUrl + "demande", demande).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(demande: Demande): Observable<Demande> {

    return this.http.put<Demande>(this.appConfig.backEndUrl + "demande/" + demande.id, demande);

  }

  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "demande/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Demande>>(this.appConfig.backEndUrl + "demande").subscribe(resp => {
      this.demandes = resp;
    }, error => console.log(error))
  }
  listDemandeHistByEntite(idEntite: number): Observable<Array<Demande>>{
    return this.http.get<Array<Demande>>(this.appConfig.backEndUrl + "demande/list-lot-demande-historique/"+idEntite)
  }
  trouverNomEntite(idDemande: number){
    return this.http.get<string>(this.appConfig.backEndUrl + "trouverNomEntiteByDemandeId/{idDemande}").subscribe(
      resp => {
        this.NomEntiteByDemandeId = resp;
      }
    )
  }


}
