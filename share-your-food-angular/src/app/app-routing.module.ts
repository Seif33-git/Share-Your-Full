import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {Accueil1Component} from "./accueil1/accueil1.component";
import {PageDonneurComponent} from "./page-donneur/page-donneur.component";
import {CreationDonComponent} from "./creation-don/creation-don.component";
import {CreationLotComponent} from "./creation-lot/creation-lot.component";
import {TableauDeBordBeneficiaireComponent} from "./tableau-de-bord-beneficiaire/tableau-de-bord-beneficiaire.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {AdministrationComponent} from "./administration/administration.component";
import {TableauDeBordDonneurComponent} from "./tableau-de-bord-donneur/tableau-de-bord-donneur.component";

const routes: Routes = [
  {path: "accueil1", component: Accueil1Component},
  {path: 'donner', component: PageDonneurComponent},
  {path: '', redirectTo: 'accueil1', pathMatch: 'full'},
  {path: 'don', component: CreationDonComponent},
  {path:'lot', component: CreationLotComponent},
  {path:'tableauDeBordBeneficiaire', component: TableauDeBordBeneficiaireComponent},
  {path:'tableauDeBordDonneur', component: TableauDeBordDonneurComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'administration', component: AdministrationComponent},
  {path: '**', component: PageNotFoundComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
