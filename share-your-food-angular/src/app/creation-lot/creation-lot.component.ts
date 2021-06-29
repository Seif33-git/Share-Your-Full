import { Component, OnInit } from '@angular/core';
import { Lot} from "../model/lot";
import {Produit} from "../model/produit";
import {ProduitHttpService} from "../services/produit.service";
import {LotHttpService} from "../services/lot.service";
import {ProduitLot} from "../model/produitLot";
import {ProduitLotHttpService} from "../services/produit-lot.service";
import {endWith} from "rxjs/operators";


@Component({
  selector: 'app-creation-lot',
  templateUrl: './creation-lot.component.html',
  styleUrls: ['./creation-lot.component.scss'],
})
export class CreationLotComponent implements OnInit {

  lotForm: Lot = new Lot();
  produitForm: Produit = null;
  produitLotForm: ProduitLot = new ProduitLot();
  produitLotForms: Array<ProduitLot> = new Array<ProduitLot>();
  types: Array<String> = new Array<String>();
  statuts: Array<String> = new Array<String>();

  constructor(private lotService: LotHttpService, private produitService: ProduitHttpService, private produitLotService: ProduitLotHttpService ) {
  }

  ngOnInit(): void {
    this.produitLotForms.push(this.produitLotForm);
  }

  listType(): Array<string> {
    return this.produitService.types;
  }

  listStatut(): Array<string> {
    return this.lotService.statuts;
  }

  listProduit(): Array<Produit> {
    return this.produitService.findAll();
  }

   addProduitLot() {
    this.produitLotForms.push (new ProduitLot());
   }

  deleteProduitLot(){
    this.produitLotForms.splice(-1,1);
  }



  saveLot() {
    if (!this.lotForm.id) {
      this.lotService.create(this.lotForm);
    } else {
      this.lotService.modify(this.lotForm).subscribe(resp => {
        this.lotService.load();
      }, error => console.log(error));
    }
    this.produitService.create(this.produitForm);

    this.lotForm = null;
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
    this.produitService.create(this.produitForm);
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
