import { Item } from "./Item";

export class Consumable extends Item {
  isConsumed: boolean;
  private _isSpoiled: boolean;

  constructor(name: string, value: number, weight: number);
  constructor(name: string, value: number, weight: number, isSpoiled?: boolean)
  constructor(name: string, value: number, weight: number, isSpoiled?: boolean) {
    super(name, value, weight);
    this._isSpoiled = isSpoiled ? isSpoiled : false;
    this.isConsumed = false;
  }

  use() {
    if(this.isConsumed) {
      return `There's nothing left of the ${this.name} to consume.`
    } else if(this._isSpoiled) {
      return `You consumed the ${this.name}.\nYou feel sick.`
    } else {
      this.isConsumed = true;
      return `You consumed the ${this.name}.`
    }
  }

  isSpoiled() {
    return this._isSpoiled;
  }
}