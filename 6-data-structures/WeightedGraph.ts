import { Vertex } from "./Vertex";
import { Edge } from "./Edge";

import { Dijkstra } from "./Dijkstra";

interface WeightedGraph<T> {
  addVertex(key: string): void;
  addEdge(vertex1: T, vertex2: T, weight: number): void;
}

export class Graph implements WeightedGraph<Vertex> {
  adjacencyList: object;

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(key: string): void {
    this.adjacencyList[key] = {};
  }

  addEdge(from: Vertex, to: Vertex, weight: number): void {
    this.adjacencyList[from.key][to.key] = weight;
    this.adjacencyList[to.key][from.key] = weight;
  }
}

const vertices = [
  new Vertex('1'),
  new Vertex('2'),
  new Vertex('3'),
  new Vertex('4'),
  new Vertex('5')
];

const vertex1 = vertices[0];
const vertex2 = vertices[1];
const vertex3 = vertices[2];
const vertex4 = vertices[3];
const vertex5 = vertices[4];

const edges = [
  new Edge(vertex1, vertex4, 3),
  new Edge(vertex1, vertex2, 5),
  new Edge(vertex1, vertex3, 4),
  new Edge(vertex2, vertex4, 6),
  new Edge(vertex2, vertex3, 5),
];
const graph: Graph = new Graph;

vertices.forEach(verticle => graph.addVertex(verticle.key));
edges.forEach(edge => graph.addEdge(edge.from, edge.to, edge.weight));

const dijkstra: Dijkstra = new Dijkstra(graph);

console.log(graph.adjacencyList);
console.log(dijkstra.findShortestPath(vertex4, vertex3));
console.log(dijkstra.findShortestPath(vertex1, vertex5));
console.log(dijkstra.findShortestPath(vertex1, vertex1));
console.log('--------------------')
console.log(dijkstra.findAllShortestPaths(vertex4));