import { Vertex } from "./Vertex";

export class Edge {
  public from: Vertex;
  public to: Vertex;
  public weight: number;

  constructor(from: Vertex, to: Vertex, weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}