import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Accueil1Component } from './accueil1/accueil1.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreationDonComponent } from './creation-don/creation-don.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CreationLotComponent } from './creation-lot/creation-lot.component';
import { PageDonneurComponent } from './page-donneur/page-donneur.component';
import {LotHttpService} from "./services/lot.service";
import {DonHttpService} from "./services/don.service";
import {ProduitLotHttpService} from "./services/produit-lot.service";
import { TableauDeBordBeneficiaireComponent } from './tableau-de-bord-beneficiaire/tableau-de-bord-beneficiaire.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AdministrationComponent } from './administration/administration.component';
import { TableauDeBordDonneurComponent } from './tableau-de-bord-donneur/tableau-de-bord-donneur.component';
import {EntrepriseHttpService} from "./services/entreprise.service";
import {ParticulierHttpService} from "./services/particulier.service";
import {AssociationHttpService} from "./services/association.service";
import {AdresseHttpService} from "./services/adresse.service";
import {UtilisateurHttpService} from "./services/utilisateur.service";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    Accueil1Component,
    AppComponent,
    CreationLotComponent,
    CreationDonComponent,
    PageDonneurComponent,
    TableauDeBordBeneficiaireComponent,
    ConnexionComponent,
    InscriptionComponent,
    AdministrationComponent,
    TableauDeBordDonneurComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [DonHttpService, LotHttpService, ProduitLotHttpService,EntrepriseHttpService, ParticulierHttpService, AssociationHttpService, AdresseHttpService, UtilisateurHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
