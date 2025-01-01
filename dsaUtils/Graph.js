//Will use for a future book or author recommendation system
class Graph {
    constructor() {
        this.graph = new Map();
    }

    addEdge(item1Arr, item2Arr) {
        if(!this.graph.has(item1Arr)) {
            this.graph.set(item1Arr, []);
        }

        if(!this.graph.has(item2Arr)) {
            this.graph.set(item2Arr, []);
        }

        this.graph.get(item1Arr).push(item2Arr);
        this.graph.get(item2Arr).push(item1Arr);

    }

    get(item) {
        return this.graph.get(item) ?? []; //if you search for 0, false, "", you will still receive some kind of recommendation
    }

}

export default Graph;