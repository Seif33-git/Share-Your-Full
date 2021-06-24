import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Association} from "../model/association";
@Injectable({
  providedIn: 'root'
})
export class AssociationHttpService {

  associations: Array<Association>;

  constructor(private http: HttpClient) {
    this.load()
  }

  findAll(): Array<Association> {
    return this.associations;
  }

  findById(id: number): Observable<Association> {
    return this.http.get<Association>("http://localhost:8080/rest/association/" + id);
  }

  create(association: Association) {
    if(association.evaluation && !association.evaluation.id) {
      association.evaluation = null;
    }
    this.http.post<Association>("http://localhost:8080/rest/association", association).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  modify(association: Association): Observable<Association> {
    if(association.evaluation && !association.evaluation.id) {
      association.evaluation = null;
    }
    return this.http.put<Association>("http://localhost:8080/rest/association/" + association.id, association);

  }

  deleteById(id: number) {
    this.http.delete("http://localhost:8080/rest/association/" + id).subscribe(resp => {
      this.load();
    }, error => console.log(error));
  }

  load() {
    this.http.get<Array<Association>>("http://localhost:8080/rest/association").subscribe(resp => {
      this.associations = resp;
    }, error => console.log(error))
  }
}
