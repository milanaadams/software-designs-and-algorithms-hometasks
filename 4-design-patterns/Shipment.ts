import { Shipper } from "./Shipper";

export interface ShipmentData {
  shipmentID: number;
  weight: number;
  fromAddress: string;
  fromZipCode: string;
  toAddress: string;
  toZipCode: string;
  isFragile: boolean;
  isNotLeave: boolean;
  isReceipt: boolean;
}

export enum ShipmentType {
  LETTER = 'Letter',
  PACKAGE = 'Packages',
  OVERSIZE = 'Oversize',
}

export interface IShipment {
  ship(): string;
}

export class Shipment implements IShipment {
  private static  shipmentInstance: Shipment;
  private static shipmentCounter: number = 0;

  protected shipmentID: number;
  protected weight: number;
  protected fromAddress: string;
  protected fromZipCode: string;
  protected toAddress: string;
  protected toZipCode: string;
  protected isFragile: boolean;
  protected isNotLeave: boolean;
  protected isReceipt: boolean;

  protected constructor(shipmentData: ShipmentData) {
    this.shipmentID = shipmentData.shipmentID || this.getShipmentID();
    this.weight = shipmentData.weight;
    this.fromAddress = shipmentData.fromAddress;
    this.fromZipCode = shipmentData.fromZipCode;
    this.toAddress = shipmentData.toAddress;
    this.toZipCode = shipmentData.toZipCode;
    this.isFragile = shipmentData.isFragile;
    this.isNotLeave = shipmentData.isNotLeave;
    this.isReceipt = shipmentData.isReceipt;
  }

  public static getInstance(shipmentData: ShipmentData): Shipment {
    if(!Shipment.shipmentInstance) {
      if(shipmentData.weight <= 15) {
        Shipment.shipmentInstance = new Letter(shipmentData);
      } else if(shipmentData.weight <= 160) {
        Shipment.shipmentInstance = new Package(shipmentData);
      } else {
        Shipment.shipmentInstance = new Oversize(shipmentData);
      }
    }

    return this.shipmentInstance;
  }

  public getShipmentID(): number {
    return ++Shipment.shipmentCounter;
  }

  public ship() {
    const shipper = new Shipper(this.fromZipCode);
    return `
      id: ${this.shipmentID}
      cost: ${shipper.getCost(this)}
      from: ${this.fromZipCode} ${this.fromAddress}
      to: ${this.toZipCode} ${this.toAddress}`
  }

  public getShipmentType(): ShipmentType {
    if(this.weight <= 15) {
      return ShipmentType.LETTER;
    } else if(this.weight <= 160) {
      return ShipmentType.PACKAGE;
    } else {
      return ShipmentType.OVERSIZE;
    }
  }

  public getShipmentWeight(): number {
    return this.weight;
  }

  public getSpecialMarks(): {isFragile: boolean, isNotLeave: boolean, isReceipt: boolean} {
    return {
      isFragile: this.isFragile,
      isNotLeave: this.isNotLeave,
      isReceipt: this.isReceipt
    }
  }
}

export class Letter extends Shipment {
  constructor(shipmentData: ShipmentData) {
      super(shipmentData);
  }
}

export class Package extends Shipment {
  constructor(shipmentData: ShipmentData) {
      super(shipmentData);
  }
}

export class Oversize extends Shipment {
  constructor(shipmentData: ShipmentData) {
      super(shipmentData);
  }
}
