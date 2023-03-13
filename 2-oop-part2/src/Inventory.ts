import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
  private _items: Item[];

  constructor() {
    this._items = [];
  }

  public addItem = (item: Item) => this._items.push(item);

  public sort(): void;
  public sort(comparator: ItemComparator): void;
  public sort(comparator?: ItemComparator): void {
    if(!comparator) {
      this._items.sort((a, b) => a.value - b.value);
    } else {
      this._items.sort((a, b) => comparator.compare(a, b));
    }
  }

  public toString = () => this._items.join(', ');
}