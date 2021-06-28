import { Component, OnInit } from '@angular/core';
import { Lot} from "../model/lot";
import {Produit} from "../model/produit";
import {ProduitHttpService} from "../services/produit.service";
import {LotHttpService} from "../services/lot.service";
import {ProduitLot} from "../model/produitLot";
import {ProduitLotHttpService} from "../services/produit-lot.service";


@Component({
  selector: 'app-creation-lot',
  templateUrl: './creation-lot.component.html',
  styleUrls: ['./creation-lot.component.scss'],
})
export class CreationLotComponent implements OnInit {

  lotForm: Lot = new Lot();
  produitForm: Produit = null;
  produitLotForm: ProduitLot = null;
  types: Array<String> = new Array<String>();
  statuts: Array<String> = new Array<String>();

  constructor(private lotService: LotHttpService, private produitService: ProduitHttpService, private produitLotService: ProduitLotHttpService ) {
  }

  ngOnInit(): void {
  }

  listLot(): Array<Lot> {
    return this.lotService.findAll();
  }

/*  listProduitLot(): Array<ProduitLot> {
    return this.produitLotService.findAll();
  }*/

  listStatut(): Array<string> {
    return this.lotService.statuts;
  }

  listType(): Array<string> {
    return this.produitService.types;
  }

  listProduit(): Array<Produit> {
    return this.produitService.findAll();
  }

  listProduitLot(): Array<ProduitLot>{
    return this.produitLotService.findAll();
  }

  addLot() {
    this.lotForm = new Lot();
    this.lotForm.produit = new Produit();
   }

  editLot(id: number) {
    this.lotService.findById(id).subscribe(resp=> {
      this.lotForm = resp;
    }, err => console.log(err));
    this.produitLotService.findById(id).subscribe(resp=> {
      this.produitLotForm = resp;
    }, err => console.log(err));

  }

  saveLot() {
    if (!this.lotForm.id) {
      this.lotService.create(this.lotForm);
    } else {
      this.lotService.modify(this.lotForm).subscribe(resp => {
        this.lotService.load();
      }, error => console.log(error));
    }
    this.lotForm = null;

    if (!this.produitLotForm.id) {
      this.produitLotService.create(this.produitLotForm);
    } else {
      this.produitLotService.modify(this.produitLotForm).subscribe(resp => {
        this.produitLotService.load();
      }, error => console.log(error));
    }
    this.produitLotForm = null;
  }
  cancelLot() {
    this.lotForm = null;
    this.produitLotForm = null;
  }
  deleteLot(id: number) {
    this.lotService.deleteById(id);
    this.produitLotService.deleteById(id);
  }

  addProduit() {
    this.produitForm = new Produit();
  }
  saveProduit(){
    if (!this.produitForm.nom) {
      this.produitService.create(this.produitForm);
    } else {
      this.produitService.modify(this.produitForm).subscribe(resp => {
        this.produitService.load();
      }, error => console.log(error));
    }
    this.produitForm = null;

  }
  editProduit(nom: string) {
    this.produitService.findById(nom).subscribe(resp=> {
      this.produitForm = resp;
    }, err => console.log(err));
  }

  cancelProduit() {
    this.produitForm = null;
  }


}
