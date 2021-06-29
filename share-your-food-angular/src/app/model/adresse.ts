import {Entite} from "./entite";

export class Adresse {
  id:number;
  version:number;
  rue:string;
  complement:string;
  codePostal:string;
  ville:string;

  entite: Entite;

  constructor(id?:number,version?:number,rue?:string,complement?:string,codePostal?:string,ville?:string) {
    this.id=id;
    this.version=version;
    this.rue=rue;
    this.complement=complement;
    this.codePostal=codePostal;
    this.ville=ville;
  }
}
