import { Shipment } from './Shipment';

interface IShipper {
  getInstance(): AirEastShipper | ChicagoSprintShipper | PacificParcelShipper;
  getCost(): number;
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

  public getCost() {
    return this.shipperInstance.getCost();
  }
}

class AirEastShipper {
  private static instance: AirEastShipper;

  private name = 'Air East';
  private location = 'Atlanta';
  private rate = 0.39;

  private constructor() {
  }

  public static getInstance() {
    if(!AirEastShipper.instance) {
      AirEastShipper.instance = new AirEastShipper();
    }

    return AirEastShipper.instance;
  }

  public getCost() {
    return this.rate;
  }
}

class ChicagoSprintShipper {
  private static instance: ChicagoSprintShipper;

  private name = 'Chicago Sprint';
  private location = 'Chicago';
  private rate = 0.42;

  private constructor() {
  }

  public static getInstance() {
    if(!ChicagoSprintShipper.instance) {
      ChicagoSprintShipper.instance = new ChicagoSprintShipper();
    }

    return ChicagoSprintShipper.instance;
  }

  public getCost() {
    return this.rate;
  }

}

class PacificParcelShipper {
  private static instance: PacificParcelShipper;

  private name = 'Pacific Parcel';
  private location = 'San Diego';
  private rate = 0.51;

  private constructor() {
  }

  public static getInstance() {
    if(!PacificParcelShipper.instance) {
      PacificParcelShipper.instance = new PacificParcelShipper();
    }

    return PacificParcelShipper.instance;
  }

  public getCost() {
    return this.rate;
  }
}
