class Order {
    constructor(orderId, date, customerId, customerName, items, discount = 0) {
        this.orderId = orderId;
        this.date = date;
        this.customerId = customerId;
        this.customerName = customerName;
        this.items = items;
        this.discount = discount;
        this.total = this.calculateTotal();
        this.grandTotal = this.total - discount;
    }

    calculateTotal() {
        return this.items.reduce((sum, item) => sum + (item.sellingPrice * item.qty), 0);
    }
}