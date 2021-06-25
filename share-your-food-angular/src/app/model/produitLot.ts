export class ProduitLot{
  id: number;
  version: number;
  dtPeremption:Date;
  quantite: string;

  constructor(id?: number, version?: number, dtPeremption?: Date, quantite?: string) {
    this.id=id!;
    this.version=version!;
    this.dtPeremption=dtPeremption!;
    this.quantite = quantite;
  }

}
