import {ProduitLot} from "./produitLot";

export class Lot {
  id: number;
  version: number;
  nom: string;
  volume: number;
  dtPeremptionLot: string;
  photo: string;
  statut: string;


  constructor(id?: number, version?: number, nom?: string, volume?: number, dtPeremptionLot?: string, photo?: string, statut?: string) {
    this.id=id!;
    this.version=version!
    this.nom=nom!;
    this.volume=volume!;
    this.dtPeremptionLot=dtPeremptionLot!;
    this.photo=photo!;
    this.statut=statut!;
  }
}
