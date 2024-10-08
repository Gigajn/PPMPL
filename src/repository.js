// src/repository.js
class Repository {
  constructor() {
    this.data = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
  }
  getAllItems() {
    return this.data;
  }
  getItemById(id) {
    return this.data.find((item) => item.id === id);
  }
  addItem(item) {
    this.data.push(item);
    return item;
  }
  deleteItemById(id) {
    const item = this.getItemById(id); // Use getItemById to check if the item exists
    if (item) {
      this.data.splice(this.data.indexOf(item), 1); // Remove the item from the array
      return true; // Successful deletion
    }
    return false; // Item not found
  }
}
module.exports = Repository;
