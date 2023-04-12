import { Vertex } from "./Vertex";
import { Graph } from "./WeightedGraph";

interface Path {
  path: string[];
  distance: number;
}

interface IDijkstra<T> {
  findShortestPath(vertex1: T, vertex2: T): Path;
  findAllShortestPaths(vertex: T): Record<string, Path>;
}

export class Dijkstra implements IDijkstra<Vertex> {
  constructor(private graph: Graph) {
    this.graph = graph;
  }

  private getShortestDistanceNode = (distances: {}, visited: string[]) => {
		let shortest: string | null = null;

		for (let node in distances) {
			let isShortest = shortest === null || distances[node] < distances[shortest];
			if (isShortest && !visited.includes(node)) {
				shortest = node;
			}
		}
		return shortest;
	};

	public findShortestPath(vertex1: Vertex, vertex2: Vertex) {
		let distance = Infinity;
		let path: null | string[] = [];

		const start = vertex1.key;
		const end = vertex2.key;

		let visited: string[] = [];
		let distances = {};

		distances[end] = 'Infinity';
		distances = Object.assign(distances, this.graph.adjacencyList[start]);

		if (start === end) {
			path = [end];
			distance = 0;
			return { path: path, distance: distance };
		}

		let parents = { endNode: null };
		for (let child in this.graph.adjacencyList[start]) {
			parents[child] = start;
		}

		let node = this.getShortestDistanceNode(distances, visited);

		while (node) {
			let nodeDistance = distances[node];
			let children = this.graph.adjacencyList[node];

			for (let child in children) {
				if (child === start) {
					continue;
				} else {
					let newDistance = nodeDistance + children[child];

					if (!distances[child] || distances[child] > newDistance) {
						distances[child] = newDistance;
						parents[child] = node;
            distance = newDistance;
					}
				}
			}
			visited.push(node);
			node = this.getShortestDistanceNode(distances, visited);
		}

		let shortestPath: string[];

		if (distance === Infinity) {
			shortestPath = [];
			return { path: shortestPath, distance: distances[end] };
		} else {
			shortestPath = [end];
		}

		let parent = parents[end];
		while (parent) {
			shortestPath.push(parent);
			parent = parents[parent];
		}

		shortestPath.reverse();

		return { path: shortestPath, distance: distances[end] };
	}

	public findAllShortestPaths(vertex: Vertex): Record<string, Path> {
		const res = {};
    for (let i in this.graph.adjacencyList) {
      if (vertex.key !== i) {
        res[i] = this.findShortestPath(vertex, new Vertex(i)) as Path
      }
    }

    return res;
  }
  
};
