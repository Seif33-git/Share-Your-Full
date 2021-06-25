import { Component, OnInit } from '@angular/core';
import { Lot} from "../model/lot";
import {Produit} from "../model/produit";
import {ProduitHttpService} from "../services/produit.service";
import {LotHttpService} from "../services/lot";

@Component({
  selector: 'app-creation-lot',
  templateUrl: './creation-lot.component.html',
  styleUrls: ['./creation-lot.component.scss']
})
export class CreationLotComponent implements OnInit {

  lotForm: Lot = null;
  produitForm: Produit = null;

  constructor(private lotService: LotHttpService, private produitService: ProduitHttpService ) {
  }

  ngOnInit(): void {
  }

  list(): Array<Lot> {
    return this.lotService.findAll();
  }

  listStatut(): Array<string> {
    return this.lotService.statuts;
  }

  listType(): Array<string> {
    return this.produitService.types;
  }

  listProduit(): Array<Produit> {
    return this.produitService.findAll();
  }



  add() {
    this.lotForm = new Lot();
  }

  edit(id: number) {
    this.lotService.findById(id).subscribe(resp=> {
      this.lotForm = resp;
    }, err => console.log(err));
  }

  save() {
    if (!this.lotForm.id) {
      this.lotService.create(this.lotForm);
    } else {
      this.lotService.modify(this.lotForm).subscribe(resp => {
        this.lotService.load();
      }, error => console.log(error));
    }
    this.lotForm = null;
  }

  cancel() {
    this.lotForm = null;
  }

  delete(id: number) {
    this.lotService.deleteById(id);
  }
}
