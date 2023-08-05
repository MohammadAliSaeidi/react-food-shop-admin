export const mockedOrdersData = [{
    orderId: "96418354",
    userId: "user_id_of_the_customer",
    orderDate: "date_and_time_of_order",
    status: "Received", // e.g., "received", "processing", "out for delivery", "delivered", "canceled"
    totalAmount: "total_order_amount",
    items: [{
        "itemId": "unique_item_id", // Foreign key referencing the item ID from the menu items table/collection
        "quantity": "item_quantity", "subtotal": "item_subtotal"
    },],
    deliveryNumber: "delivery house number",
    deliveryStreet: "delivery_street",
    deliveryCity: "delivery_city",
    deliveryState: "delivery_state",
    paymentMethod: "payment_method_used",
    transactionId: "transaction_id_from_payment_gateway",
    notes: "any_additional_notes_from_the_customer_or_admin",
    createdAt: "timestamp_of_order_creation",
    updatedAt: "timestamp_of_last_update"
}]