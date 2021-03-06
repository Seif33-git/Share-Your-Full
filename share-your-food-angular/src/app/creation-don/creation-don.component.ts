import {Component, OnInit} from '@angular/core';
import {Don} from "../model/don";
import {DonHttpService} from "../services/don.service";
import {Lot} from "../model/lot";
import {LotHttpService} from "../services/lot.service";
import {ProduitLotHttpService} from "../services/produit-lot.service";
import {ProduitLot} from "../model/produitLot";
import {Router} from "@angular/router";
import {Produit} from "../model/produit";
import {ProduitHttpService} from "../services/produit.service";

@Component({
  selector: 'app-creation-don',
  templateUrl: './creation-don.component.html',
  styleUrls: ['./creation-don.component.scss']
})
export class CreationDonComponent implements OnInit {

  donForm: Don = new Don();
  lotForm: Lot = null;
  lotDonsEnCours: Array<Lot> = new Array<Lot>();
  produitLotForm: ProduitLot = new ProduitLot();
  produitLotForms: Array<ProduitLot> = new Array<ProduitLot>();
  produitForm: Produit = new Produit();
  categorieProduit: string = "FRAIS";
  produitByCategorie: Array<Produit>;
  Volume: number;
  DateP: Date;
  /* Enumérations :*/
  types: Array<String> = new Array<String>();
  statuts: Array<String> = new Array<String>();

  ceBoutonApparait:boolean=false;

  constructor(private donService: DonHttpService, private lotService: LotHttpService,  private produitLotService: ProduitLotHttpService,private produitService: ProduitHttpService, private route: Router ) {
  }

  ngOnInit(): void {
    /*   this.lotDonsEnCours.push(this.lotForm);*/
    this.produitLotForms.push(this.produitLotForm);
    this.listProduit(this.categorieProduit);
  }

  listType(): Array<string> {
    return this.produitService.types;
  }

  listLot(): Array<Lot> {
    return this.lotService.findAll();
  }

  listProduit(categorieProduit: string) {
    this.produitService.findAllByCategorie(categorieProduit).subscribe(resp => {
      this.produitByCategorie = resp;
    }, error => console.log(error));
  }

  /*Relatif à un Don */

  saveDon() {
    if (!this.donForm.id && this.donForm.creneau) {
      this.donForm.entite = JSON.parse(sessionStorage.getItem("utilisateur")).entite;
      this.donService.create(this.donForm);
    } else {
      this.donService.modify(this.donForm).subscribe(resp => {
        this.donService.load();
      }, error => console.log(error));
    }


    this.donForm = new Don();
    this.lotDonsEnCours = new Array<Lot>();

  }

  cancelDon() {
    this.donForm = null;
  }

  /*Relatif à un Lot */

  addProduitLot() {
    this.produitLotForms.push(new ProduitLot());
    console.log(this.produitLotForms)
  }

  deleteProduitLot() {
    this.produitLotForms.splice(-1, 1);
  }

  addLot() {
    this.lotForm = new Lot();
  }

  saveLot() {
    this.ceBoutonApparait=true;
    this.lotForm.statut = "DISPONIBLE"
    this.lotForm.dtPeremptionLot = this.DateP.toISOString().substr(0,10);
    this.lotForm.produitLots = this.produitLotForms;
    this.lotDonsEnCours.push(this.lotForm);
    this.produitLotForms = new Array<ProduitLot>();
    this.produitLotForms.push(new ProduitLot());
    this.donForm.lot = this.lotDonsEnCours;

    this.Volume= 0;
    this.DateP= null;
    this.lotForm = null;
    /*  }else {
        console.error("Veuillez indiquer le nom et la qte du lot");
      }*/
  }

  editLot(index: number) {
    this.lotForm = this.lotDonsEnCours[index];
    this.produitLotForms = this.lotForm.produitLots;
    this.deleteLot(index);
  }

  cancelLot() {
    this.lotForm = null;
    this.produitLotForm = null;
  }

  deleteLot(index: number) {
    this.lotDonsEnCours.splice(index, 1);
  }

  /*Relatif à un Produit */

  addProduit() {
    this.produitForm = new Produit();
  }

  saveProduit() {
    this.produitService.create(this.produitForm).subscribe(resp => {
      this.listProduit(this.categorieProduit);
    }, error => console.log(error));
    this.produitForm = new Produit();
  }

  actualisationProduit() {
    this.listProduit(this.categorieProduit);
  }

  cancelProduit() {
    this.produitForm = null;
  }

  calculVolume() {
    this.Volume = 0;
    for (let pl of this.produitLotForms) {
      this.Volume = this.Volume + pl.quantite
    }
  }

  calculDateP() {
    this.DateP = null;
    if (this.DateP == null){
      this.DateP = new Date (this.produitLotForm.dtPeremption);
    }

    for (let pl of this.produitLotForms) {
      if (this.DateP > new Date(pl.dtPeremption)) {
        this.DateP = new Date(pl.dtPeremption)
      }
    }
  }

}

