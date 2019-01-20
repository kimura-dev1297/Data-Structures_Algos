class HashMap {
   // The constructor sets up an array called _slots which will hold all of the data. The hash map has a length, as well as a capacity. The capacity will grow in chunks similar to how your array implementation worked. This will help to cut down the number of memory allocations which need to take place.
  constructor(initialCapacity=8) {
      this.length = 0;
      this._slots = [];
      this._capacity = initialCapacity;
      this._deleted = 0;
  }

  get(key) {
      const index = this._findSlot(key);
      if (this._slots[index] === undefined) {
          throw new Error('Key error');
      }
      return this._slots[index].value;
  }

  
  // The set function first checks whether load ratio is greater than the given maximum. If so it resizes the hash map using the _resize function, which you'll look at in a moment. Next the function finds the appropriate slot, and adds an object to the array containing the key/value pair, increasing the length. Again, this has an O(1) best and average case, and an O(n) worst case.
  set(key, value) {
      const loadRatio = (this.length + this._deleted + 1) / this._capacity;
      if (loadRatio > HashMap.MAX_LOAD_RATIO) {
          this._resize(this._capacity * HashMap.SIZE_RATIO);
      }

      const index = this._findSlot(key);
      this._slots[index] = {
          key,
          value,
          deleted: false
      };
      this.length++;
  }

  remove(key) {
      const index = this._findSlot(key);
      const slot = this._slots[index];
      if (slot === undefined) {
          throw new Error('Key error');
      }
      slot.deleted = true;
      this.length--;
      this._deleted++;
  }
  
// The _findSlot is used to find the correct slot for a given key. It uses the _hashString function to calculate the hash of the key, and modulos this to fit within the current capacity. It then loops through the array, stopping when it finds the slot with a matching key, or an empty slot. The _slots array will never be full due to our maximum load factor, so the function will always return a slot.

// The best and average case performance for the _findSlot function is O(1); assuming the hash function is good and the load ratio is suitable then the chances of collision (and needing to iterate) should be low. In the worst case it's O(n), as you have to linearly search through each slot.
  _findSlot(key) {
      const hash = HashMap._hashString(key);
      const start = hash % this._capacity;

      for (let i=start; i<start + this._capacity; i++) {
          const index = i % this._capacity;
          const slot = this._slots[index];
          if (slot === undefined || (slot.key == key && !slot.deleted)) {
              return index;
          }
      }
  }

    // Resizing a hash map is really a bit of a misnomer. To make sure that each item lives in the correct location you really just recreate the hash map from scratch with a larger capacity:
  _resize(size) {
      const oldSlots = this._slots;
      this._capacity = size;
      // Reset the length - it will get rebuilt as you add the items back
      this.length = 0;
      this._deleted = 0;
      this._slots = [];

      for (const slot of oldSlots) {
          if (slot !== undefined && !slot.deleted) {
              this.set(slot.key, slot.value);
          }
      }
  }

  // The _hashString function takes a string and hashes it, outputting a number. This is the famous djb2 algorithm. Don't worry if you don't understand why it works; it's far more important to know what it does.
  static _hashString(string) {
      let hash = 5381;
      for (let i=0; i<string.length; i++) {
          hash = (hash << 5) + hash + string.charCodeAt(i);
          hash = hash & hash;
      }
      return hash >>> 0;
  }
}

// The MAX_LOAD_RATIO is the highest that the ratio between the length and the capacity will be allowed to reach. So when 90% of the slots are filled, then a resize will take place. You'll see why this is important shortly.
HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;
