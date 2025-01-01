//Will use for a more complex future book or author recommender

function dfs(graph, currentNode, visited = new Set()) {
    //start of with the current node as visited
    visited.add(currentNode);

    //traverse though all adjacent nodes(neighbors)
    let neighbors = graph.get(currentNode);
    for(const neighbor of neighbors) {
        if(!visited.has(neighbor)) {
            dfs(graph, neighbor, visited) // Recursion on unvisited neighbors
        }
    } 

}

export default dfs;