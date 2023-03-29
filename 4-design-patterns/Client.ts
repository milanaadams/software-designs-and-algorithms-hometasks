import { Shipment, ShipmentData,  } from "./Shipment";
import { ShipmentDecorator } from "./ShipmentDecorator";
import { IShipment } from "./Shipment";

export class Client {
  private shipment: IShipment;

  constructor(private data: ShipmentData) {
    this.shipment = new ShipmentDecorator(Shipment.getInstance(data));
  }

  public createShipment() {
    console.log(this.shipment.ship());
  }
}