import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Association} from "../model/association";
import {AppConfigService} from "../app-config.service";
import {Entreprise} from "../model/entreprise";
@Injectable({
  providedIn: 'root'
})
export class AssociationHttpService {

  associations: Array<Association>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load()
  }

  findAll(): Array<Association> {
    return this.associations;
  }

  findById(id: number): Observable<Association> {
    return this.http.get<Association>(this.appConfig.backEndUrl + "association/" + id);
  }

  create(association: Association) {

    this.http.post<Association>(this.appConfig.backEndUrl +"association", association).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  createID(association: Association) {

    this.http.post<Association>(this.appConfig.backEndUrl + "association", association).subscribe(resp => {
      console.log(association.id);
      association.id=resp.id;
      console.log(association.id);
      this.load();
    }, error => console.log(error));
  }

  modify(association: Association): Observable<Association> {

    return this.http.put<Association>(this.appConfig.backEndUrl + "association/" + association.id, association);

  }

  deleteById(id: number) {
    this.http.delete(this.appConfig.backEndUrl + "association/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Association>>(this.appConfig.backEndUrl + "association").subscribe(resp => {
      this.associations = resp;
    }, error => console.log(error))
  }
}
