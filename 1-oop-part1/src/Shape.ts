import { Point } from "./Point";

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  public points: Point[];
  abstract getType(): string;

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color?: string, filled?: boolean) {
    this.points = points;
    this.color = color ?? 'green';
    this.filled = filled ?? true;
    this.checkIsShape();
  }

  checkIsShape = () => {
    if(this.points.length < 3) throw Error('Must have a least 3 points');
  }

  toString = () => `A Shape with color of ${this.color} and ${this.filled ? 'filled' : 'not filled'}. Points: ${this.points.join(', ')}.`
  getPerimeter = () => {
    return this.points.reduce((acc, point, inx) => {
      if(this.points.length - 1 !== inx) return acc + point.distance(this.points[inx + 1]);
      return acc + point.distance(this.points[0]);
    }, 0)
  }

}
