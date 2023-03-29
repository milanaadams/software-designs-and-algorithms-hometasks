import { Shipment, ShipmentType } from './Shipment';

interface IShipper {
  getInstance(): AirEastShipper | ChicagoSprintShipper | PacificParcelShipper;
  getCost(shipment: Shipment): number;
}

export class Shipper implements IShipper {
  private shipperInstance: AirEastShipper | ChicagoSprintShipper | PacificParcelShipper;

  constructor(zip: string) {
      this.shipperInstance = this.getShipper(zip);
  }

  private getShipper(zip: string) {
    switch(zip[0]) {
      case '1':
      case '2':
      case '3':
        return AirEastShipper.getInstance();
      case '4':
      case '5':
      case '6':
        return ChicagoSprintShipper.getInstance();
      case '7':
      case '8':
      case '9':
        return PacificParcelShipper.getInstance();
      default:
        throw new Error('Invalid zip code');
    }
  }

  public getInstance() {
    return this.shipperInstance;
  }

  public getCost(shipment: Shipment) {
    return this.shipperInstance.getCost(shipment.getShipmentType(), shipment.getShipmentWeight());
  }
}

class AirEastShipper {
  private static instance: AirEastShipper;

  private name = 'Air East';
  private location = 'Atlanta';

  private letterRate = 0.39;
  private packageRate = 0.25;
  private oversizedFlatFee = 10;

  private constructor() {
  }

  public static getInstance() {
    if(!AirEastShipper.instance) {
      AirEastShipper.instance = new AirEastShipper();
    }

    return AirEastShipper.instance;
  }

  public getCost(type: ShipmentType, weight: number) {
    switch(type) {
      case ShipmentType.LETTER:
        return weight * this.letterRate;
      case ShipmentType.PACKAGE:
        return weight * this.packageRate;
      default:
        return weight * this.packageRate + 10;
    }
  }
}

class ChicagoSprintShipper {
  private static instance: ChicagoSprintShipper;

  private name = 'Chicago Sprint';
  private location = 'Chicago';
  
  private letterRate = 0.42;
  private packageRate = 0.20;

  private constructor() {
  }

  public static getInstance() {
    if(!ChicagoSprintShipper.instance) {
      ChicagoSprintShipper.instance = new ChicagoSprintShipper();
    }

    return ChicagoSprintShipper.instance;
  }

  public getCost(type: ShipmentType, weight: number) {
    switch(type) {
      case ShipmentType.LETTER:
        return weight * this.letterRate;
      default:
        return weight * this.packageRate;
    }
  }

}

class PacificParcelShipper {
  private static instance: PacificParcelShipper;

  private name = 'Pacific Parcel';
  private location = 'San Diego';
  
  private letterRate = 0.51;
  private packageRate = 0.19;
  private oversizedAdditionalRate = 0.02;

  private constructor() {
  }

  public static getInstance() {
    if(!PacificParcelShipper.instance) {
      PacificParcelShipper.instance = new PacificParcelShipper();
    }

    return PacificParcelShipper.instance;
  }

  public getCost(type: ShipmentType, weight: number) {
    switch(type) {
      case ShipmentType.LETTER:
        return weight * this.letterRate;
      case ShipmentType.PACKAGE:
        return weight * this.packageRate;
      default:
        return weight * (this.packageRate + this.oversizedAdditionalRate);
    }
  }
}
