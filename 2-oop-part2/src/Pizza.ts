import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
  readonly numberOfSlices: number;
  private _numberOfEatenSlices: number;

  constructor(value: number, weight: number, numberOfSlices: number) {
    super('pizza', value, weight)
    this.numberOfSlices = numberOfSlices;
    this._numberOfEatenSlices = 0;
  }

  use() {
    if(this._numberOfEatenSlices < this.numberOfSlices) {
      this._numberOfEatenSlices += 1;
      return 'You consumed a slice of the pizza.';
    }

    return 'There\'s nothing left of the pizza to consume.';
  }

  getNumberOfEatenSlices() {
    return this._numberOfEatenSlices;
  }
}