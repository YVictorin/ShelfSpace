class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        let added = false;
        const task = { element, priority };

        //Insert based on priority
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].priority > task.priority) {  // checks for a higher priority (a smaller priority number)
                this.items.splice(i, 1, task); // Insert task at position i
                added = true; 
                break; //no need to loop once the higher priority task has been added
            }
        }

        if(!added) {
            this.items.push(task);
        }
    }

    dequeue() {
        return this.items.shift();
    }

    // Process method to handle processing all items in the queue
    processQueue() {
        while(this.items.length > 0) {
            this.dequeue()
        }
    }
}

export default PriorityQueue;