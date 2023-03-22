import { Shipper } from "./Shipper";

export interface ShipmentData {
  shipmentID: number;
  weight: number;
  fromAddress: string;
  fromZipCode: string;
  toAddress: string;
  toZipCode: string;
}

export enum ShipmentType {
  LETTER = 'Letter',
  PACKAGE = 'Packages',
  OVERSIZE = 'Oversize',
}

export class Shipment {
  private static shipmentInstance: Shipment;
  private static shipmentCounter: number = 0;
  private rate: number = 0.39;

  private shipmentID: number;
  private weight: number;
  private fromAddress: string;
  private fromZipCode: string;
  private toAddress: string;
  private toZipCode: string;

  protected constructor(shipmentData: ShipmentData) {
    this.shipmentID = shipmentData.shipmentID || this.getShipmentID();
    this.weight = shipmentData.weight;
    this.fromAddress = shipmentData.fromAddress;
    this.fromZipCode = shipmentData.fromZipCode;
    this.toAddress = shipmentData.toAddress;
    this.toZipCode = shipmentData.toZipCode;
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
      to: ${this.toZipCode} ${this.toAddress}
      `
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
