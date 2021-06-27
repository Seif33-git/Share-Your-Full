import {Entite} from "./entite";

export class Particulier extends Entite{
  prenom:string;
  age:number;

  constructor(id?:number,version?:number,nom?:string,donneur?:boolean,beneficiaire?:boolean,prenom?:string,age?:number) {
    super(id,version,nom, donneur,beneficiaire);
    this.prenom=prenom;
    this.age=age;
  }
}
