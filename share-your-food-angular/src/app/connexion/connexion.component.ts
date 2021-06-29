import { Component, OnInit } from '@angular/core';
import {ConnexionHttpService} from "../services/connexion.service";
import {JSONFile} from "@angular/cli/utilities/json-file";
import {ConnexionDTO} from "../model/connexionDTO";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  conn: ConnexionDTO = new ConnexionDTO();
  constructor(private connexionService: ConnexionHttpService ) { }

  ngOnInit(): void {
  }

  connexion(){
    console.log(this.conn)
    this.connexionService.connexionAuth(this.conn).subscribe(resp => {
      sessionStorage.setItem("utilisateur",JSON.stringify(resp));

      sessionStorage.setItem("idEntite",JSON.parse(sessionStorage.getItem("utilisateur")).entite.id);

    }, error => console.log(error))
  }
}
