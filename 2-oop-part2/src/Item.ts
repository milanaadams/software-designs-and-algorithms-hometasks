import { Comparable } from "./Comparable";

export class Item implements Comparable<Item> {
  static idCounter: number;
  readonly name: string;
  public value: number;
  public weight: number;
  readonly id: number;

  constructor(name: string, value: number, weight: number) {
    this.name = name;
    this.value = value;
    this.weight = weight;

    Item.idCounter += 1;
    this.id = Item.idCounter;
  }

  public compareTo(other: Item) {
    const compare = (val1: number | string, val2: number | string) => {
      if(val1 > val2) {
        return 1;
      } else if(val1 < val2) {
        return -1;
      } else {
        return 0;
      }
    };

    const valueComparison = compare(this.value, other.value);

    if(valueComparison === 0) {
      return compare(this.name.toLowerCase(), other.name.toLowerCase());
    }

    return valueComparison;
  }

  public toString() {
    return `${this.name} − Value: ${(Math.round(this.value * 100) / 100).toFixed(2)}, Weight: ${(Math.round(this.weight * 100) / 100).toFixed(2)}`;
  }

  public getId() {
    return this.id;
  }

  static resetIdCounter() {
    Item.idCounter = 0;
  }
}