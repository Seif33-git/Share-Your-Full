import {Produit} from "./produit";

export class Lot {
  id: number;
  nom: string;
  volume: number;
  dtPeremptionLot: string;
  photo: string;
  statut: string;
  produit: Array<Produit> = new Array<Produit>();


  constructor(id?: number, nom?: string, volume?: number, dtPeremptionLot?: string, photo?: string, statut?: string) {
    this.id=id!;
    this.nom=nom!;
    this.volume=volume!;
    this.dtPeremptionLot=dtPeremptionLot!;
    this.photo=photo!;
    this.statut=statut!;
  }
}
