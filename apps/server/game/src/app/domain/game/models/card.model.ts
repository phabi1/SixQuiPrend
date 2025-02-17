import { Serializable } from '../interfaces/serializable.interface';

export class Card implements Serializable {
  private value: number = 0;
  private points: number = 0;

  constructor(value = 0, points = 0) {
    this.value = value;
    this.points = points;
  }

  serialize() {
    return {
      value: this.value,
      points: this.points,
    };
  }
  
  unserialize(data: any): void {
    this.value = data.value;
    this.points = data.points;
  }
}
