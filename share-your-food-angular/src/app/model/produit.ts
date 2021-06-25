export class Produit{
  nom:string;
  version: number;
  type: string;

  constructor(nom?: string, version?: number, type?: string) {
    this.nom=nom!;
    this.version=version!;
    this.type=type!;
  }

}
