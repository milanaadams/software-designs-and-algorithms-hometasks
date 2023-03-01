import { Item } from "./Item";

export abstract class Weapon extends Item {
  public static MODIFIER_CHANGE_RATE: number;
  protected baseDamage: number;
  protected damageModifier: number;
  private _baseDurability: number;
  protected durabilityModifier: number;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);

    this.baseDamage = baseDamage;
    this._baseDurability = baseDurability;
    Weapon.MODIFIER_CHANGE_RATE = 0.05;
    this.damageModifier = 0;
    this.durabilityModifier = 0;
  }

  public getEffectiveDamage() {
    return this.baseDamage + this.damageModifier;
  }

  public getEffectiveDurability(): number;
  public getEffectiveDurability(durabilityModifier: number): number;
  public getEffectiveDurability(durabilityModifier?: number) {
    if(durabilityModifier) return durabilityModifier + this._baseDurability;
    return this._baseDurability + this.durabilityModifier;
  }

  public toString() {
    return `${this.name} − Value: ${(Math.round(this.value * 100) / 100).toFixed(2)}, Weight: ${(Math.round(this.weight * 100) / 100).toFixed(2)}, Damage: ${(Math.round(this.getEffectiveDamage() * 100) / 100).toFixed(2)}, Durability: ${Math.round(this.getEffectiveDurability() * 100).toFixed(2)}%`;
  }

  public use() {
    if(this._baseDurability + this.durabilityModifier <= 0) return `You can't use the ${this.name}, it is broken.`;

    let message = `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.`;
    this._baseDurability -= Weapon.MODIFIER_CHANGE_RATE;

    if(this.getEffectiveDurability() <= 0) {
      message += `\nThe ${this.name} breaks.`;
    }

    return message;
  }
}