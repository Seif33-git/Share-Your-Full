import {Component, Input, OnInit} from '@angular/core';
import {ParticulierHttpService} from "../services/particulier.service";
import {Particulier} from "../model/particulier";
import {Entreprise} from "../model/entreprise";
import {Association} from "../model/association";
import {Utilisateur} from "../model/utilisateur";
import {UtilisateurHttpService} from "../services/utilisateur.service";
import {EntrepriseHttpService} from "../services/entreprise.service";
import {AssociationHttpService} from "../services/association.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  particulierForm: Particulier=null;
  utilisateurParticulier:Utilisateur=null;

  entrepriseForm: Entreprise=null;
  entrepriseSelect:Entreprise=null;
  utilisateurEntreprise:Utilisateur=null;
  nouvelleEntreprise: Entreprise=null;

  associationForm:Association=null;
  associationSelect: Association=null;
  utilisateurAssociation:Utilisateur=null;
  nouvelleAssociation : Association=null;

  constructor(private particulierService: ParticulierHttpService, private utilisateurService: UtilisateurHttpService, private entrepriseService: EntrepriseHttpService, private associationService: AssociationHttpService) { }

  ngOnInit(): void {
  }

  addParticulier() {
   this.particulierForm = new Particulier();
   this.entrepriseForm=null;
   this.associationForm=null;
    this.utilisateurParticulier=null;
  }

  addUtilisateur() {
    if (!this.particulierForm.id) {
           this.particulierService.createID(this.particulierForm)
        }
    this.utilisateurParticulier= new Utilisateur();
  }

  addEntreprise() {
    this.entrepriseForm = new Entreprise();
    this.utilisateurEntreprise = new Utilisateur();
    this.particulierForm=null;
    this.associationForm=null;
    this.entrepriseSelect=null;
  }

  addAssociation() {
    this.associationForm = new Association();
    this.utilisateurAssociation = new Utilisateur();
    this.particulierForm=null;
    this.entrepriseForm=null;
    this.associationSelect=null;
  }


  saveUtilisateurAssocieParticulier() {
    console.log(this.particulierForm.id);
    this.utilisateurParticulier.entite = this.particulierForm;
    console.log(this.utilisateurParticulier.entite.id);
    if (!this.utilisateurParticulier.id) {
      this.utilisateurService.create(this.utilisateurParticulier)
    }
  }

  listEntreprise() {
    return this.entrepriseService.findAll();
  }

  listAssociation() {
    return this.associationService.findAll();
  }

  onChangeEntreprise(entrepriseSelected : number) {
    this.entrepriseService.findById(entrepriseSelected).subscribe(resp => {
      console.log("Nom selectionné: "+resp.nom+", id correspondant: "+entrepriseSelected);
      this.entrepriseSelect = resp;
    });

}

  onChangeAssociation(associationSelected : number) {
    this.associationService.findById(associationSelected).subscribe(resp => {
      console.log("Nom selectionné: "+resp.nom+", id correspondant: "+associationSelected);
      this.associationSelect = resp;
    });
  }

  addCreation() {
    this.nouvelleEntreprise = new Entreprise();
    this.nouvelleAssociation=new Association();
  }

  annuler() {
    this.nouvelleEntreprise=null;
    this.nouvelleAssociation=null;
  }
  annulerTout() {
    this.particulierForm=null;
    this.entrepriseForm=null;
    this.associationForm=null;
  }

  addTableau() {
    this.entrepriseSelect = this.nouvelleEntreprise;
    this.associationSelect = this.nouvelleAssociation;

    if(!this.entrepriseSelect.id) {
      this.entrepriseService.createID(this.entrepriseSelect);
    }

    if(!this.associationSelect.id) {
      this.associationService.createID(this.associationSelect);
    }

    this.utilisateurEntreprise=new Utilisateur();
    console.log("Nom selectionné: "+this.entrepriseSelect.nom+", id correspondant: "+this.entrepriseSelect.id);
    this.nouvelleEntreprise=null;
    this.nouvelleAssociation=null;
  }

  delete(id: number) {
    this.entrepriseService.deleteById(id);
    this.entrepriseSelect=null;
  }

  saveUtilisateurAssocieEntreprise() {
    this.utilisateurEntreprise.entite = this.entrepriseSelect;
    if (!this.utilisateurEntreprise.id) {
      this.utilisateurService.create(this.utilisateurEntreprise)
    }
  }

  saveUtilisateurAssocieAssociation() {
    this.utilisateurAssociation.entite = this.associationSelect;
    if (!this.utilisateurAssociation.id) {
      this.utilisateurService.create(this.utilisateurAssociation)
    }
  }

}
