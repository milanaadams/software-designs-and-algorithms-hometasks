import { Shipment, ShipmentData } from "./Shipment";

export class Client {
  private shipment: Shipment;

  constructor(private data: ShipmentData) {
    this.shipment = Shipment.getInstance(this.data);
  }

  public createShipment() {
    console.log(this.shipment.ship());
  }
}