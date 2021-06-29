

export class dashboardGiverDTO {
  id: number
  nomLot: string;
  quantiteLot: number;
  nomEntite: string;

  constructor(id?: number, nomLot?: string, quantiteLot?: number, nomEntite?: string) {
    this.id=id!;
    this.nomLot=nomLot!;
    this.quantiteLot=quantiteLot!;
    this.nomEntite=nomEntite;
  }
}
