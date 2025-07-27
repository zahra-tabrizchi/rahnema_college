class node {
    constructor (value, next = null) {
        this.value = value
        this.next = next
    }
}


class linkedList {
    constructor() {
        this.head = null;
    }
    // function to insert a value at the beginning of a linkedList
    Prepend(value) {
        const newNode = new node(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    // function to insert a value at the end of a linkedList
    Append(value)
    {
        const newNode = new node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let iter = this.head;
            while(iter.next !==null ) {
                iter = iter.next;
            }
            iter.next = newNode;
        }
    }
    // function that returns the size of a linkedList
    Size() {
        let iter = this.head;
        let counter = 0

        while(iter !==null) {
            counter ++
            iter = iter.next;
        }
        return counter
    }

    //gets index i as an argument and return the i'st value in the linkedList
    At(i) {
        let iter = this.head;
        let counter = 0
        while(iter !== null) {
            counter ++
            if (counter === i) {
                return iter.value
            } 
            iter = iter.next
        }
        
        throw new Error('Index out of bounds');

    }
    // gets another linkedList as argument and appends it at the end of the LinkedList
    Join(linkedList) {
        if (!linkedList.head) return
        if (!this.head) {
            this.head = linkedList.head
        } else {
            let iter = this.head;
        while (iter.next !==null) {
            iter = iter.next;
        }
        iter.next = linkedList.head
        }
    }
    // gets another function as input argument and maps the linkedList accordingly
    Map(fn) {
        const newList = new linkedList();
        let iter = this.head;
        while (iter !== null) {
            const newValue = fn(iter.value);
            newList.Append(newValue);
            iter = iter.next;
        }
        return newList;
    }
    // gets a conditional boolean function as input argument and returns 
    // a new linkedList with them members that match that condition
    Filter(fn) {
        const filteredList = new linkedList()
        let iter = this.head;
        
        while (iter !==null) {
            if(fn(iter.value)) {
                filteredList.Append(iter.value)
            }
            iter = iter.next;
        }
        return filteredList;
        
    }
}
