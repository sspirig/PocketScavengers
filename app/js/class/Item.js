export default class Item {
    constructor(name, type, unitPrice) {
      this.name = name;
      this.type = type;
      this.unitPrice = unitPrice;
    }
  
    /**
     * Function for display
     * @param {null | number} count 
     */
    displayShopInfo(count = null) {
        if (count == null) {
            // for selling
            return `${this.type} ${this.name} - ${this.unitPrice}$/unité`;
        }
        else {
            // for showing
            return `${count}x - ${this.type} ${this.name}`;
        }
      
    }
  }