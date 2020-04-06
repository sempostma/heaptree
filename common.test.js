const Heap = require('./heap')

const randomNumber = () => Math.floor(Math.random() * 100)

const createARangeOfRandomIntegers = length => {
    return new Array(length)
        .fill(0)
        .map(randomNumber)
}

const ascendingComparator = (a, b) => a - b
const descendingComparator = (a, b) => b - a

const isValidSeries = (array, comparator = ascendingComparator) => {
    for (let i = 0; i < array.length - 1; i++) {
        const sortValue = comparator(array[i], array[i + 1])
        if (sortValue > 0) {
            return false
        }
    }
    return true;
}

test('test heaptree order', () => {
    const heap = new Heap()
    heap.push(6, 5, 7, 2, 4, 9, 2, 8)
    const result = []
    while (heap.length) {
        result.push(heap.pop())
    }
    expect(isValidSeries(result)).toEqual(true)
})

test('test heaptree order with random data', () => {
    const inputData = createARangeOfRandomIntegers(100)
    const heap = new Heap()
    heap.push(...inputData)
    const result = []
    while (heap.length) {
        result.push(heap.pop())
    }
    expect(isValidSeries(result)).toEqual(true)
})

test('test heapify with constructor', () => {
    const heap = new Heap([6, 5, 7, 2, 4, 9, 2, 8])
    const result = []
    while (heap.length) {
        result.push(heap.pop())
    }
    expect(isValidSeries(result)).toEqual(true)
})

test('test heapify with constructor and random data', () => {
    const inputData = createARangeOfRandomIntegers(100)
    const heap = new Heap(inputData)
    const result = []
    while (heap.length) {
        result.push(heap.pop())
    }
    expect(isValidSeries(result)).toEqual(true)
})

test('test push and pop with random data', () => {
    const heap = new Heap()
    for (let i = 0; i < 100; i++) {
        heap.push(randomNumber())
        heap.push(randomNumber())
        heap.pop()
    }

    const result = []
    while (heap.length) {
        result.push(heap.pop())
    }

    expect(isValidSeries(result)).toEqual(true)
})

test('test clone', () => {
    const heap = new Heap([6, 5, 7, 2, 4, 9, 2, 8])
    const cloned = heap.clone()
    expect(cloned !== heap).toEqual(true)
    expect(cloned.items !== heap.items).toEqual(true)
    expect(cloned.items).toEqual(heap.items)
})

test('test heap concationation', () => {
    const heap = new Heap([6, 5, 7, 2, 4, 9, 2, 8], descendingComparator)
    const heap2 = new Heap([3, 8, 4, 9, 1, 5])
    const heap3 = new Heap([4, 2, 1, 10, 3, 7, 9])

    const resultHeap = heap.concat(heap2, heap3)

    expect(resultHeap != heap).toEqual(true)
    expect(resultHeap.seek()).toEqual(10)
})


