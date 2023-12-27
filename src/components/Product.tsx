import React from "react";

function Product() {
    const productStyleObj: React.CSSProperties = {
        marginBottom: '20px'
    }
    return (
        <>
            <br/>
            <div className="container">
                <h1>Product Details</h1>
                <br/>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4" style={productStyleObj}>
                        <div className="form-group">
                            <label htmlFor="productName" className="mb-1">Product Name</label>
                            <input type="text" className='form-control' id='productName'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="price" className="mb-1">Unit Price</label>
                            <input type="number" className='form-control' id='price'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="qty" className="mb-1">QTY on Hand</label>
                            <input type="number" className='form-control' id='qty'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={productStyleObj}>
                        <div className="form-group">
                            <label htmlFor="image" className="mb-1">Product Image</label>
                            <input type="file" className='form-control' id='image'/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="description" className="mb-1">Description</label>
                            <textarea rows={5} className='form-control' id='description'/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <button className='btn btn-primary col-12'>Save Product</button>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <form className='col-12' action="">
                            <input type="search" className="form-control" placeholder="Search Products Here ..."/>
                        </form>
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
                                <th>QTY on Hand</th>
                                <th>Unit Price</th>
                                <th>Update Option</th>
                                <th>Delete Option</th>
                                <th>See More</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>#1001</td>
                                <td>Nimal Bandara</td>
                                <td>Colombo City</td>
                                <td>25000.00</td>
                                <td>
                                    <button className="btn btn-outline-success btn-sm">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger btn-sm">Delete</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-info btn-sm">View</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product



