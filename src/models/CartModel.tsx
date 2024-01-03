interface Cart {
    _id: string | undefined,
    productName: string | undefined,
    unitPrice: number | '',
    qty: number | undefined,
    total: number | undefined
}

export default Cart;