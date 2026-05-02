class OrderItem {
    constructor(code = '', name = '', sellingPrice = 0, qty = 1) {
        this.code = code;
        this.name = name;
        this.sellingPrice = sellingPrice;
        this.qty = qty;
    }

    getTotal() {
        return this.sellingPrice * this.qty;
    }
}