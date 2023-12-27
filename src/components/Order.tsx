import React from "react";

function Order() {
    const OrderStyleObj: React.CSSProperties = {
        marginBottom: '20px'
    }
    const bottomContext: React.CSSProperties = {
        width: '100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    }
    const totalTextStyle: React.CSSProperties = {
        color:'red',
        margin:0
    }
    return (
        <>
            <br/>
            <div className="container">
                <h1>Order Details</h1>
                <br/>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3" style={OrderStyleObj}>
                        <div className="form-group">
                            <label htmlFor="customer" className="mb-1">Select Customer</label>
                            <select id="customer" className='form-control'>
                                <option value="Use Options" defaultValue='Use Options' disabled>Use Options</option>
                                <option value="#">Customer 1</option>
                                <option value="#">Customer 2</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="form-group">
                            <label htmlFor="name" className="mb-1">Customer Name</label>
                            <input type="text" className='form-control' id='name' disabled/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="form-group">
                            <label htmlFor="address" className="mb-1">Customer Address</label>
                            <input type="text" className='form-control' id='address' disabled/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="form-group">
                            <label htmlFor="salary" className="mb-1">Salary</label>
                            <input type="number" className='form-control' id='salary' disabled/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3" style={OrderStyleObj}>
                        <div className="form-group">
                            <label htmlFor="product" className="mb-1">Select Product</label>
                            <select id="product" className='form-control'>
                                <option value="Use Options" defaultValue='Use Options' disabled>Use Options</option>
                                <option value="#">Product 1</option>
                                <option value="#">Product 2</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="form-group">
                            <label htmlFor="description" className="mb-1">Product Description</label>
                            <input type="text" className='form-control' id='description' disabled/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2">
                        <div className="form-group">
                            <label htmlFor="price" className="mb-1">Unit Price</label>
                            <input type="number" className='form-control' id='price' disabled/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2">
                        <div className="form-group">
                            <label htmlFor="qtyOnHand" className="mb-1">QTY on Hand</label>
                            <input type="number" className='form-control' id='qtyOnHand' disabled/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-2">
                        <div className="form-group">
                            <label htmlFor="qty" className="mb-1">QTY</label>
                            <input type="number" className='form-control' id='qty'/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <button className='btn btn-success col-12'>+ Add Product</button>
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
                            <tr>
                                <td>#2082</td>
                                <td>Product 1</td>
                                <td>220.00</td>
                                <td>18</td>
                                <td>25000.00</td>
                                <td>
                                    <button className="btn btn-outline-danger btn-sm">Remove</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <br/>

                        <div className="bottom-context" style={bottomContext}>
                            <div className="total-outer">
                                <h3 style={totalTextStyle}>Total : 25000.00</h3>
                            </div>
                            <div className="btn-order-context">
                                <button className='btn btn-primary'>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order