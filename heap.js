
/**
 * Callback for adding two numbers.
 *
 * @callback comparator
 * @param {any} a - Item 1.
 * @param {any} b - Item 2.
 * @returns {number} sorting value
 */

/** Class representing the Heap */
class Heap {
    /**
     * 
     * @param {Array|undefined} items 
     * @param {comparator} comparator 
     */
    constructor(items, comparator) {
        this.comparator = typeof comparator === 'function' ? comparator : ((a, b) => a - b)
        this.length = 0
        this.items = []
        if (Array.isArray(items)) {
            this.push(...items)
        }
    }

    /**
     * Returns the top item
     * @returns {any} The top most item
     */
    seek() {
        if (arguments.length !== 0) throw new SyntaxError(`Expected 0 arguments for .seek() but received ${arguments.length}.`)
        return this.items[0];
    }

    /**
     * Pushes items onto the heap
     * @param {...any} items - The items to push onto the heap
     * @returns {number} Heap length
     */
    push(...items) {
        for (let j = 0; j < items.length; j++) {
            const item = items[j];
            let i = this.items.length;
            this.items.push(item);
            while (i > 0 && this.comparator(this.items[Math.floor((i + 1) / 2 - 1)], this.items[i]) > 0) {
                let t = this.items[i];
                this.items[i] = this.items[Math.floor((i + 1) / 2 - 1)];
                this.items[Math.floor((i + 1) / 2 - 1)] = t;
                i = Math.floor((i + 1) / 2 - 1);
            }
        }
        this.length = this.items.length
        return this.length
    }

    /**
     * Pops the top most item
     * @returns {any} The top most item
     */
    pop() {
        if (arguments.length !== 0) throw new SyntaxError(`Expected 0 arguments for .pop() but received ${arguments.length}.`)
        if (this.items.length <= 1) {
            this.length = 0
            return this.items.pop();
        }
        const ret = this.items[0];
        this.items[0] = this.items.pop();
        let i = 0;
        while (true) {
            let lowest = this.comparator(this.items[(i + 1) * 2 - 1], this.items[(i + 1) * 2]) > 0
                ? (i + 1) * 2 : (i + 1) * 2 - 1;
            if (this.comparator(this.items[i], this.items[lowest]) > 0) {
                let t = this.items[i];
                this.items[i] = this.items[lowest];
                this.items[lowest] = t;
                i = lowest
            } else break;
        }
        this.length = this.items.length
        return ret;
    }

    /**
     * Delete an item from the heap
     * @param {any} item - The item to delete
     */
    delete(item) {
        if (arguments.length !== 1) throw new SyntaxError(`Expected 1 argument for .delete() but received ${arguments.length}.`)
        let i = this.items.indexOf(item);
        // heapify
        this.items[i] = this.items.pop();
        while (true) {
            let lowest = this.comparator(this.items[(i + 1) * 2 - 1], this.items[(i + 1) * 2]) > 0
                ? (i + 1) * 2 : (i + 1) * 2 - 1;
            if (this.comparator(this.items[i], this.items[lowest]) > 0) {
                let t = this.items[i];
                this.items[i] = this.items[lowest];
                this.items[lowest] = t;
                i = lowest
            } else break;
        }
        this.length = this.items.length
    }

    /**
     * Concats multiple heaps
     * @param {...Heap} heaps - The heaps to concat
     * @returns {Heap} The new Heap
     */
    concat(...heaps) {
        const newHeap = this.clone()
        for (let j = 0; j < heaps.length; j++) {
            const heap = heaps[j];
            newHeap.push(...heap.items);
        }
        return newHeap
    }

    /**
     * @returns {Array} The internal array of items
     */
    toArray() {
        if (arguments.length !== 1) throw new SyntaxError(`Expected 0 arguments for .toArray() but received ${arguments.length}.`)
        return this.items.slice(0)
    }

    /**
     * Always false
     * @returns {boolean} A value indicating if this object is an array (always false)
     */
    isArray() {
        return false
    }

    /**
     * Copies the heap and the internal array, references to items inside the array are not deeply cloned.
     * @returns {Heap} Deep copy
     */
    clone() {
        return new Heap(this.items, this.comparator)
    }
}

module.exports = Heap
