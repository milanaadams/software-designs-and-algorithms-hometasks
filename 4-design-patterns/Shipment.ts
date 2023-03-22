import { Shipper } from "./Shipper";

export interface ShipmentData {
  shipmentID: number;
  weight: number;
  fromAddress: string;
  fromZipCode: string;
  toAddress: string;
  toZipCode: string;
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

  private constructor(shipmentData: ShipmentData) {
    this.shipmentID = shipmentData.shipmentID || this.getShipmentID();
    this.weight = shipmentData.weight;
    this.fromAddress = shipmentData.fromAddress;
    this.fromZipCode = shipmentData.fromZipCode;
    this.toAddress = shipmentData.toAddress;
    this.toZipCode = shipmentData.toZipCode;
  }

  public static getInstance(shipmentData: ShipmentData): Shipment {
    if(!Shipment.shipmentInstance) {
      Shipment.shipmentInstance = new Shipment(shipmentData);
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
      cost: ${this.weight * shipper.getCost()}
      from: ${this.fromZipCode} ${this.fromAddress}
      to: ${this.toZipCode} ${this.toAddress}
      `
    }
}