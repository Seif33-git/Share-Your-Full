import {Component, Input, OnInit} from '@angular/core';
import {ParticulierHttpService} from "../services/particulier.service";
import {Particulier} from "../model/particulier";
import {Entreprise} from "../model/entreprise";
import {Association} from "../model/association";
import {Utilisateur} from "../model/utilisateur";
import {UtilisateurHttpService} from "../services/utilisateur.service";
import {EntrepriseHttpService} from "../services/entreprise.service";
import {AssociationHttpService} from "../services/association.service";
import {Adresse} from "../model/adresse";
import {AdresseHttpService} from "../services/adresse.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  particulierForm: Particulier=null;
  utilisateurParticulier:Utilisateur=null;
  adresseParticulier: Adresse=null;

  entrepriseForm: Entreprise=null;
  entrepriseSelect:Entreprise=null;
  utilisateurEntreprise:Utilisateur=null;
  nouvelleEntreprise: Entreprise=null;
  categories: Array<String> = new Array<String>();

  associationForm:Association=null;
  associationSelect: Association=null;
  utilisateurAssociation:Utilisateur=null;
  nouvelleAssociation : Association=null;

  adresseSelectEntreprise: Adresse=null;
  nouvelleAdresseEntreprise: Adresse=null;

  adresseSelectAssociation: Adresse=null;
  nouvelleAdresseAssociation: Adresse=null;

  isActiveBool: boolean=false;
  isActiveBool2: boolean=false;
  isActiveBool3: boolean=false;
  isActiveBool4: boolean=false;
  flagDelete: boolean=false;

  constructor(private particulierService: ParticulierHttpService, private utilisateurService: UtilisateurHttpService, private entrepriseService: EntrepriseHttpService, private associationService: AssociationHttpService, private  adresseService: AdresseHttpService) { }

  ngOnInit(): void {
  }

  listCategories(): Array<string> {
    return this.entrepriseService.categories;
  }

  // PARTICULIER :: Bouton d'accès inscription
  addParticulier() {
   this.particulierForm = new Particulier();
   this.entrepriseForm=null;
   this.associationForm=null;
    this.utilisateurParticulier=null;
    this.adresseParticulier=null;
   this.isActiveBool=false;
   this.isActiveBool2=false;

  }

  // ENTREPRISE :: Bouton d'accès inscription
  addEntreprise() {
    this.entrepriseForm = new Entreprise();
    this.utilisateurEntreprise = new Utilisateur();
    this.particulierForm=null;
    this.associationForm=null;
    this.entrepriseSelect=null;
    this.nouvelleAdresseEntreprise=null;
    this.nouvelleEntreprise=null;
    this.isActiveBool3=false;
    this.flagDelete=false;
  }

  // ASSOCIATION :: Bouton d'accès inscription
  addAssociation() {
    this.associationForm = new Association();
    this.utilisateurAssociation = new Utilisateur();
    this.particulierForm=null;
    this.entrepriseForm=null;
    this.associationSelect=null;
    this.nouvelleAdresseAssociation=null;
    this.nouvelleAssociation=null;
    this.isActiveBool4=false;
    this.flagDelete=false;
  }

  // ENTREPRISE :: Recherche toutes les entreprises de la BBD
  listEntreprise() {
    return this.entrepriseService.findAll();
  }

  // ASSOCIATION :: Recherche toutes les associations de la BBD
  listAssociation() {
    return this.associationService.findAll();
  }

  //  ENTREPRISE OU ASSOCIATION :: Affiche le formulaire de création
  addCreation() {
    this.nouvelleEntreprise = new Entreprise();
    this.nouvelleAssociation=new Association();
  }

  // ENTREPRISE :: Affiche le résultat de la selection dans le tableau
  //entrepriseSelect peut provenir soit de la liste, soit de la nouvelle création
  onChangeEntreprise(entrepriseSelected : number) {
    this.flagDelete=false;
    this.entrepriseService.findById(entrepriseSelected).subscribe(resp => {
      console.log("Nom selectionné: "+resp.nom+", id correspondant: "+entrepriseSelected);
      this.entrepriseSelect = resp;
    });
  }

  // ASSOCIATION :: Affiche le résultat de la selection dans le tableau
  //associationSelect peut provenir soit de la liste, soit de la nouvelle création
  onChangeAssociation(associationSelected : number) {
    this.flagDelete=false;
    this.associationService.findById(associationSelected).subscribe(resp => {
      console.log("Nom selectionné: "+resp.nom+", id correspondant: "+associationSelected);
      this.associationSelect = resp;
    });
  }

  // PARTICULIER :: Bouton 1 :  ajouter une adresse
  // Crée l'entite Particulier et ouvre une nouvelle adresse
  saveEntiteParticulier() {
    if (!this.particulierForm.id&&this.particulierForm.nom) {
      this.isActiveBool=true;
      this.particulierService.createID(this.particulierForm)
      console.log("DONNEUR : "+this.particulierForm.donneur+"BENEF : "+this.particulierForm.beneficiaire)
      this.adresseParticulier= new Adresse();
    } else {
      console.error("Veuillez indiquer un nom svp");
    }
  }

  // ENTREPRISE :: Bouton 1 :  ajouter une adresse
  // Crée l'entite Entreprise et ouvre une nouvelle adresse
  saveEntiteEntreprise() {
    this.entrepriseSelect = this.nouvelleEntreprise;
    if (!this.entrepriseSelect.id&&this.entrepriseSelect.nom&&this.entrepriseSelect.siret) {
      this.isActiveBool3=true;
      this.entrepriseService.createID(this.entrepriseSelect);
      this.nouvelleAdresseEntreprise= new Adresse();
    } else {
      console.error("Veuillez indiquer un nom et un siret svp");
    }
  }

  // ASSOCIATION :: Bouton 1 :  ajouter une adresse
  // Crée l'entite Association et ouvre une nouvelle adresse
  saveEntiteAssociation() {
    this.associationSelect = this.nouvelleAssociation;
    if (!this.associationSelect.id&&this.associationSelect.nom&&this.associationSelect.numeroAssociation) {
      this.isActiveBool4=true;
      this.associationService.createID(this.associationSelect)
      this.nouvelleAdresseAssociation= new Adresse();
    } else {
      console.error("Veuillez indiquer un nom et un numéro associatif svp");
    }
  }

  // PARTICULIER :: Bouton 2 :  Détail de connexion
  // Crée l'adresse, la lie à l'entité (1 Adresse possède 1 Entité) et ouvre un nouvel utilisateur
  saveAdresseParticulier() {
    this.isActiveBool2=true;
    this.adresseParticulier.entite = this.particulierForm;
    if (!this.adresseParticulier.id&&(this.adresseParticulier.rue || this.adresseParticulier.complement || this.adresseParticulier.codePostal || this.adresseParticulier.ville )) {
           this.adresseService.createID(this.adresseParticulier);
            this.utilisateurParticulier= new Utilisateur();
        } else {
      this.utilisateurParticulier= new Utilisateur();
    }
  }

  // ENTREPRISE :: Bouton 2 :  Valider
  // Crée l'adresse, la lie à l'entité (1 Adresse possède 1 Entité) et ouvre un nouvel utilisateur
  addTableauEntreprise() {
    this.flagDelete=true;
    this.adresseSelectEntreprise = this.nouvelleAdresseEntreprise;

    if (!this.adresseSelectEntreprise.id&&this.adresseSelectEntreprise.rue&&this.adresseSelectEntreprise.codePostal&&this.adresseSelectEntreprise.ville) {
      this.adresseSelectEntreprise.entite = this.entrepriseSelect;
      this.adresseService.createID(this.adresseSelectEntreprise);
      this.utilisateurEntreprise=new Utilisateur();
      this.nouvelleEntreprise=null;
      this.nouvelleAdresseEntreprise=null;
    } else {
      console.error("Veuillez indiquer l'adresse de l'entreprise svp");
    }
  }

  // ASSOCIATION :: Bouton 2 :  Valider
  // Crée l'adresse, la lie à l'entité (1 Adresse possède 1 Entité) et ouvre un nouvel utilisateur
  addTableauAssociation() {
    this.flagDelete=true;
    this.adresseSelectAssociation = this.nouvelleAdresseAssociation;


    if (!this.adresseSelectAssociation.id&&this.adresseSelectAssociation.rue&&this.adresseSelectAssociation.codePostal&&this.adresseSelectAssociation.ville) {
      this.adresseSelectAssociation.entite = this.associationSelect;
      this.adresseService.createID(this.adresseSelectAssociation);
      this.utilisateurEntreprise=new Utilisateur();
      this.nouvelleAssociation=null;
      this.nouvelleAdresseAssociation=null;
    } else {
      console.error("Veuillez indiquer l'adresse de l'entreprise svp");
    }
  }

  // PARTICULIER :: Bouton 3 :  Valider
  // Crée l'utilisateur et le lie au particulier (1 Utilisateur possède 1 Entité)
  saveUtilisateurParticulier() {
    this.utilisateurParticulier.entite = this.particulierForm;
    if (!this.utilisateurParticulier.id&&this.utilisateurParticulier.mail&&this.utilisateurParticulier.motDePasse) {
      this.utilisateurService.createID(this.utilisateurParticulier);
    } else {
      console.error("Veuillez entrer un email et un mot de passe")
    }
  }

  // ENTREPRISE :: Bouton 3 :  Valider
  // Crée l'utilisateur et le lie à l'entreprise (1 Utilisateur possède 1 Entité)
  saveUtilisateurAssocieEntreprise() {
    this.utilisateurEntreprise.entite = this.entrepriseSelect;
    if (!this.utilisateurEntreprise.id&&this.entrepriseSelect&&this.utilisateurEntreprise.mail&&this.utilisateurEntreprise.motDePasse) {
      this.utilisateurService.createID(this.utilisateurEntreprise)
    } else {
      console.error("Veuillez entrer un email et un mot de passe")
    }
  }

  // ASSOCIATION :: Bouton 3 :  Valider
  // Crée l'utilisateur et le lie à l'association (1 Utilisateur possède 1 Entité)
  saveUtilisateurAssocieAssociation() {
    this.utilisateurAssociation.entite = this.associationSelect;
    if (!this.utilisateurAssociation.id&&this.associationSelect&&this.utilisateurAssociation.mail&&this.utilisateurAssociation.motDePasse) {
      this.utilisateurService.createID(this.utilisateurAssociation)
    } else {
      console.error("Veuillez entrer un email et un mot de passe")
    }
  }

  annuler() {
    this.nouvelleEntreprise=null;
    this.nouvelleAdresseEntreprise=null;
    this.nouvelleAssociation=null;
    this.nouvelleAdresseAssociation=null;
  }
  annulerTout() {
    this.particulierForm=null;
    this.entrepriseForm=null;
    this.associationForm=null;
  }


  delete(id: number) {
    this.entrepriseService.deleteById(id);
    this.entrepriseSelect=null;


    this.associationService.deleteById(id);
    this.associationSelect=null;
  }

  changeBeneficiaire() {
    if (this.particulierForm) {
      this.particulierForm.beneficiaire = true;
      console.log(" DONNEUR : "+this.particulierForm.donneur+"BENEF : "+this.particulierForm.beneficiaire);
    }
   else if (this.nouvelleEntreprise) {
      this.nouvelleEntreprise.beneficiaire=true;
      console.log(" DONNEUR : "+this.nouvelleEntreprise.donneur+"BENEF : "+this.nouvelleEntreprise.beneficiaire);
    }
  }

  changeDonneur() {
    if (this.particulierForm) {
      this.particulierForm.beneficiaire = false;
      console.log(" DONNEUR : "+this.particulierForm.donneur+"BENEF : "+this.particulierForm.beneficiaire);
    }
    else if (this.nouvelleEntreprise) {
      this.nouvelleEntreprise.beneficiaire=false;
      console.log(" DONNEUR : "+this.nouvelleEntreprise.donneur+"BENEF : "+this.nouvelleEntreprise.beneficiaire);
    }
  }

  changeBeneficiaireAsso() {
    this.nouvelleAssociation.beneficiaire=true;
    console.log(" DONNEUR : "+this.nouvelleAssociation.donneur+"BENEF : "+this.nouvelleAssociation.beneficiaire);
  }

  changeDonneurAsso() {
    this.nouvelleAssociation.beneficiaire=false;
    console.log(" DONNEUR : "+this.nouvelleAssociation.donneur+"BENEF : "+this.nouvelleAssociation.beneficiaire);
  }
}
