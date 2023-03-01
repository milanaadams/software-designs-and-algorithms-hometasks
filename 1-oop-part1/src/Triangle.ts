import { Shape } from "./Shape";
import { Point } from "./Point";

export class Triangle extends Shape{
  constructor(pointA: Point, pointB: Point, pointC: Point, ...args: (string | boolean)[]) {
    super([pointA, pointB, pointC], ...(args as []));
  }

  toString = () => {
    let message = 'Triangle[';

    this.points.map((point, idx) => {
      message += `v${idx + 1}=${point.toString()}`;
      if(idx < 2) message += ',';
    })

    message += ']';

    return message;
  }

  getType = () => {
    const sides: number[] = this.points.map((point, idx) => Math.round(this.points[idx].distance(this.points[idx < 2 ? idx + 1 : 0]) * 10) / 10);
    const uniqueSides = new Set(sides);
    if(uniqueSides.size === 1) {
      return 'equilateral triangle';
    } else if(uniqueSides.size === 2) {
      return 'isosceles triangle';
    } else {
      return 'scalene triangle';
    }
  };
}