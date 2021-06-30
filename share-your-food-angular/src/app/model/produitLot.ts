import {Lot} from "./lot";
import {Produit} from "./produit";

export class ProduitLot{
  id: number;
  version: number;
  dtPeremption:string;
  quantite: number;
  lot : Lot;
  produit: Produit;

  constructor(id?: number, version?: number, dtPeremption?: string, quantite?: number) {
    this.id=id!;
    this.version=version!;
    this.dtPeremption=dtPeremption!;
    this.quantite = quantite;
    this.produit = new Produit();
    this.lot = new Lot();
  }

}
