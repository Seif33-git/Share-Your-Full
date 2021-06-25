

export class Lot {
  id: number;
  nom: string;
  volume: number;
  dtPeremptionLot: string;
  photo: string;
  statut: string;
  categorie : string;

  constructor(id?: number, nom?: string, volume?: number, dtPeremptionLot?: string, photo?: string, statut?: string) {
    this.id=id!;
    this.nom=nom!;
    this.volume=volume!;
    this.dtPeremptionLot=dtPeremptionLot!;
    this.photo=photo!;
    this.statut=statut!;
  }
}
