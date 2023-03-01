export class Point {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  toString = () => `(${this.x}, ${this.y})`;
 
  public distance(): number;
  public distance(other: Point): number;
  public distance(x: number, y: number): number;
  public distance(...args: any): number {
    if(args[0] !== undefined && args[1] !== undefined) {
      return this.getDistance(args[0], args[1]);
    } else if (args[0] instanceof Point) {
      return this.getDistance(args[0].x, args[0].y)
    } else {
      return this.getDistance(0, 0);
    }
  }

  private getDistance = (x2: number, y2: number) => {
    let y = x2 - this.x;
    let x = y2 - this.y;
    
    return Math.sqrt(x * x + y * y);
  }
}