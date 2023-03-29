import { Shipment } from "./Shipment";
import { MockData } from "./MockData";

import { IShipment } from "./Shipment";

export class ShipmentDecorator implements IShipment {
  private fragileMark = '**MARK FRAGILE**';
  private notLeaveMark = '**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**';
  private returnReceiptMark = '**MARK RETURN RECEIPT REQUESTED**';

  constructor(protected shipment: Shipment) {

  }

  public ship(): string { 
    let shipString = this.shipment.ship();
    const {isFragile, isNotLeave, isReceipt} = this.shipment.getSpecialMarks();
    if(isFragile) shipString = `${shipString}\n ${this.fragileMark}`;
    if(isNotLeave) shipString = `${shipString}\n ${this.notLeaveMark}`;
    if(isReceipt) shipString = `${shipString}\n ${this.returnReceiptMark}`;

    return shipString;
  }
}