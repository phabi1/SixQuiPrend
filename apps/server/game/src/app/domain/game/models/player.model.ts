import { Serializable } from '../interfaces/serializable.interface';

export class Player implements Serializable {
  private id: string = '';
  private name: string = '';
  private points: number = 0;

  getId() {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getPoints() {
    return this.points;
  }

  setPoints(points: number) {
    this.points = points;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      points: this.points,
    };
  }
  unserialize(data: any): void {
    this.id = data.id;
    this.name = data.name;
    this.points = data.points;
  }
}
