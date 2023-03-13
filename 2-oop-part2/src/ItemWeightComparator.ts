import { ItemComparator } from "./ItemComparator";
import { Item } from "./Item";

export class ItemWeightComparator implements ItemComparator {
  public compare(first: Item, second: Item): number {
    const compare = (val1: number | string, val2: number | string) => {
      if(val1 > val2) {
        return 1;
      } else if(val1 < val2) {
        return -1;
      } else {
        return 0;
      }
    };

    const valueComparison = compare(first.weight, second.weight);

    if(valueComparison === 0) {
      return first.compareTo(second);
    }

    return valueComparison;
  }
}