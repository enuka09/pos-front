import React, {useEffect, useState} from "react";
import AxiosInstance from "../config/axiosInstance.ts";
import Customer from "../models/CustomerModel"
import Product from "../models/ProductModel"
import Cart from "../models/CartModel";

const Order: React.FC = () => {
    const OrderStyleObj: React.CSSProperties = {
        marginBottom: '20px'
    }
    const bottomContext: React.CSSProperties = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
    const totalTextStyle: React.CSSProperties = {
        color: 'red',
        margin: 0
    }

    const [customerDetails, setCustomerDetails] = useState<Customer[]>([]);
    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState<number | ''>('');

    const [productDetails, setProductDetails] = useState<Product[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [qtyOnHand, setQtyOnHand] = useState<number | ''>('');
    const [userQty, setUserQty] = useState<number>(0);

    const [cart, setCart] = useState<Cart[]>([]);

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [netTotal, setNetTotal] = useState<number>(0);

    useEffect(() => {
        findAllCustomers();
        findAllProducts()
    }, [])

    const findAllCustomers = async () => {
        const response = await AxiosInstance.get('/customers/find-all?searchText=&page=1&size=10');
        setCustomerDetails(response.data)
    }

    const getCustomerById = async (id: string) => {
        const customerRecord = await AxiosInstance.get('/customers/find-by-id/' + id);
        setSelectedCustomer(customerRecord.data);
        setAddress(customerRecord.data.address);
        setSalary(parseFloat(customerRecord.data.salary));
    }

    const findAllProducts = async () => {
        const response = await AxiosInstance.get('/products/find-all?searchText=&page=1&size=10');
        setProductDetails(response.data)
    }

    const getProductById = async (id: string) => {
        const productRecord = await AxiosInstance.get('/products/find-by-id/' + id);
        setSelectedProduct(productRecord.data);
        setName(productRecord.data.name);
        setDescription(productRecord.data.description);
        setUnitPrice(parseFloat(productRecord.data.unitPrice));
        setQtyOnHand(parseFloat(productRecord.data.qtyOnHand));
    }

    const addToCart = async (newItem: Cart) => {
        setCart((prevState) => [...prevState, newItem])
        setAddress('');
        setSalary('');
        setSelectedProduct(null);
        setDescription('');
        setUnitPrice('');
        setQtyOnHand('');
        setUserQty(0);
    }

    const setTotal = () => {
        let amount = 0;
        cart.map((data) => {
            amount += data.total;
            setNetTotal(amount);
        })
    }

    return (
        <>
            <br/>
            <div className="container">
                <h1>Order Details</h1>
                <br/>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4" style={OrderStyleObj}>
                        <div className="form-group">
                            <label htmlFor="customer" className="mb-1">Select Customer</label>
                            <select id="customer" className='form-control' onChange={(e) => {
                                getCustomerById(e.target.value);
                            }} value={selectedCustomer ? selectedCustomer._id : ''}>
                                <option value=''>Select value</option>
                                {customerDetails.map((customer, index) => (
                                    <option key={index} value={customer._id}>{customer.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="address" className="mb-1">Customer Address</label>
                            <input value={address} type="text" className='form-control' id='address' disabled/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="salary" className="mb-1">Salary</label>
                            <input value={salary} type="number" className='form-control' id='salary' disabled/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3" style={OrderStyleObj}>
                        <div className="form-group">
                            <label htmlFor="product" className="mb-1">Select Product</label>
                            <select id="product" className='form-control' onChange={(e) => {
                                getProductById(e.target.value);
                            }} value={selectedProduct ? selectedProduct._id : ''}>
                                <option value=''>Select value</option>
                                {productDetails.map((product, index) => (
                                    <option key={index} value={product._id}>{product.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="form-group">
                            <label htmlFor="description" className="mb-1">Product Description</label>
                            <input value={description} type="text" className='form-control' id='description' disabled/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2">
                        <div className="form-group">
                            <label htmlFor="price" className="mb-1">Unit Price</label>
                            <input value={unitPrice} type="number" className='form-control' id='price' disabled/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2">
                        <div className="form-group">
                            <label htmlFor="qtyOnHand" className="mb-1">QTY on Hand</label>
                            <input value={qtyOnHand} type="number" className='form-control' id='qtyOnHand' disabled/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2">
                        <div className="form-group">
                            <label htmlFor="qty" className="mb-1">QTY</label>

                            <input
                                onChange={(e) => {
                                    setUserQty(parseFloat(e.target.value));
                                }}
                                type="number"
                                className='form-control'
                                id='qty'
                                value={userQty}
                            />
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <button className='btn btn-success col-12' onClick={() => {
                            const cartProduct: Cart = {
                                _id: selectedProduct?._id,
                                productName: name,
                                unitPrice: unitPrice,
                                qty: userQty,
                                total: (userQty * (unitPrice ? unitPrice : 0))
                            }
                            addToCart(cartProduct);
                        }}>+ Add Product
                        </button>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <table className='table table-hover table-bordered'>
                            <thead>
                            <tr>
                                <th>#Id</th>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th>QTY</th>
                                <th>Total</th>
                                <th>Remove Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cart.map((data, index) => (
                                <tr key={index}>
                                    <td>#{data._id}</td>
                                    <td>{data.productName}</td>
                                    <td>{data.unitPrice}</td>
                                    <td>{data.qty}</td>
                                    <td>{data.total}</td>
                                    <td>
                                        <button onClick={() => {
                                            setCart((prevState) => prevState.filter((cartData) => cartData._id !== data._id));
                                        }} className="btn btn-outline-danger btn-sm">Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <br/>

                        <div className="bottom-context" style={bottomContext}>
                            <div className="total-outer">
                                <h3 style={totalTextStyle}>{netTotal}</h3>
                            </div>
                            <div className="btn-order-context">
                                <button className='btn btn-primary' onClick={async () => {
                                    try {
                                        const response = await AxiosInstance.post('/orders/create/', {
                                            date: new Date(),
                                            customerDetails: selectedCustomer,
                                            totalCost: 130,
                                            products: cart
                                        });

                                        if (response.status === 201) {
                                            alert('Order Saved');
                                        } else {
                                            alert('Failed to save order');
                                        }
                                    } catch (error) {
                                        console.error('Error placing order:', error);
                                        alert('Failed to save order');
                                    }
                                }}>Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order
