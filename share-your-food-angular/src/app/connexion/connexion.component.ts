import { Component, OnInit } from '@angular/core';
import {ConnexionHttpService} from "../services/connexion.service";
import {JSONFile} from "@angular/cli/utilities/json-file";
import {ConnexionDTO} from "../model/connexionDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  conn: ConnexionDTO = new ConnexionDTO();
  flagMDP: boolean;
  constructor(private connexionService: ConnexionHttpService, private router:Router ) { }

  ngOnInit(): void {this.flagMDP = false;
  }

  connexion(){
    console.log(this.conn)
    this.connexionService.connexionAuth(this.conn).subscribe(resp => {
      sessionStorage.setItem("utilisateur",JSON.stringify(resp));
      sessionStorage.setItem("idEntite",JSON.parse(sessionStorage.getItem("utilisateur")).entite.id);
      this.flagMDP = false
      this.router.navigate(['/accueil2']);
    }, error => {
      console.log("Mauvais mot de Passe");
      this.flagMDP = true
      //pas de redirect
    })
  }
}
