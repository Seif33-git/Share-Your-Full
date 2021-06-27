import {Entite} from "./entite";

export class Association extends Entite{
  numeroAssociation:string;
  justificatif:string;

  constructor(id?:number,version?:number,nom?:string,donneur?:boolean,beneficiaire?:boolean,numeroAssociation?:string,justificatif?:string) {
    super(id,version,nom, donneur,beneficiaire);
    this.numeroAssociation=numeroAssociation;
    this.justificatif=justificatif;
  }
}
