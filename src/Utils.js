/**
 * Generates a random integer between two given values.
 * 
 * @param {int} min minimum value
 * @param {int} max maximum value 
 * 
 * @returns the generated integer
 */
export function random(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }

/**
 * User defined PriorityQueue helper class. Stores element and its priority.
 */
class QElement { 
    constructor(element, priority) 
    { 
        this.element = element; 
        this.priority = priority; 
    } 
} 
  
/**
 * Represents a priority queue data structure.
 */
class PriorityQueue { 
    constructor() { 
        this.items = []; 
    } 
  
    /**
     * Determines if an element is in the priority queue.
     * 
     * @param {Object} element element to search for
     * 
     * @returns the index of the element, false if not found
     */
    contains(element) {
        for (var i = 0; i < this.items.length; i++) {
            if(this.items[i].element === element) return i;
        }
        return false;
    }

    /**
     * Sets an element's priority.
     * 
     * @param {Object} element the element
     * @param {int} priority new priority
     */
    setPriority(element, priority) {
        var has = this.contains(element);
        if(!has) return;
        this.items.splice(has, 1);
        this.enqueue(element, priority);
    }

    /**
     * Adds an element to the priority queue with a given priority.
     * 
     * @param {Object} element 
     * @param {int} priority 
     */
    enqueue(element, priority) 
    { 
        var qElement = new QElement(element, priority); 
        var contain = false; 

        for (var i = 0; i < this.items.length; i++) { 
            if (this.items[i].priority > qElement.priority) { 
                this.items.splice(i, 0, qElement); 
                contain = true; 
                break; 
            } 
        } 

        if (!contain) this.items.push(qElement);  
    } 

    /**
     * Removes and returns the first element from the priority queue.
     * 
     * @returns the removed element, false if the queue is empty
     */
    dequeue() 
    { 
        if (this.isEmpty()) return false; 
        return this.items.shift(); 
    } 


    /**
     * Returns the highest priority element in the queue without removing it.
     * 
     * @returns highest priority element, false if empty
     */
    front() 
    { 
        if (this.isEmpty()) return false; 
        return this.items[0]; 
    } 

    /**
     * Returns the lowest priority element in the queue without removing it.
     * 
     * @returns lowest priority element, false if empty
     */
    rear() 
    {  
        if (this.isEmpty()) return false; 
        return this.items[this.items.length - 1]; 
    } 

    /**
     * Determines if the priority queue is empty or not.
     * 
     * @returns if the priority queue is empty
     */
    isEmpty() { return this.items.length === 0; } 


    /**
     * Prints all elements of the priority queue.
     * 
     * @returns the generated print string
     */
    printPQueue() 
    { 
        var str = ""; 
        for (var i = 0; i < this.items.length; i++) str += this.items[i].element + " "; 
        return str; 
    } 
} 

export default PriorityQueue;