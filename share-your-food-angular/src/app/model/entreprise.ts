import {Entite} from "./entite";

export class Entreprise extends Entite{
  siret:string;
  categorie:string;

  constructor(id?:number,version?:number,nom?:string,donneur?:boolean,beneficiaire?:boolean,siret?:string,categorie?:string) {
    super(id,version,nom, donneur,beneficiaire);
    this.siret=siret;
    this.categorie=categorie;
  }
}
