import React, {ChangeEvent, useEffect, useState} from "react";
import AxiosInstance from "../config/axiosInstance.ts";
import {Modal} from "react-bootstrap";
import Product from "../models/ProductModel"
import {storage} from "../config/firebase";

const ProductComponent: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.files[0]);
    }

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState<number | ''>('');
    const [qtyOnHand, setQtyOnHand] = useState<number | ''>('');

    const [modalState, setModalState] = useState<boolean>(false);

    const [selectedProductId, setSelectedProductId] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedUnitPrice, setUpdatedUnitPrice] = useState<number | ''>('');
    const [updatedQtyOnHand, setUpdatedQtyOnHand] = useState<number | ''>('');

    useEffect(() => {
        findAllProducts()
    }, [])

    const findAllProducts = async () => {
        const response = await AxiosInstance.get('/products/find-all?searchText=&page=1&size=10');
        setProducts(response.data)
    }

    const saveProduct = async () => {
        let imageUrl = 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51SrMeLDbrL._AC_UL480_FMwebp_QL65_.jpg';
        if (image) {
            try {
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`images/${Math.random() + '-' + image.name}`)
                const snapshot = await imageRef.put(image);
                imageUrl = await snapshot.ref.getDownloadURL()
            } catch (e) {
                console.log(e)
            }
        }

        try {
            await AxiosInstance.post('/products/create', {
                name, description, unitPrice, qtyOnHand, image: imageUrl
            });
            setName('');
            setDescription('');
            setUnitPrice('');
            setQtyOnHand('');
            findAllProducts()
        } catch (e) {
            console.log(e)
        }
    }

    const deleteProduct = async (id: string) => {
        await AxiosInstance.delete('/products/delete-by-id/' + id);
        findAllProducts();
    }

    const loadModal = async (id: string) => {
        const productRecord = await AxiosInstance.get('/products/find-by-id/' + id);
        setSelectedProductId(productRecord.data._id)
        setUpdatedName(productRecord.data.name);
        setUpdatedDescription(productRecord.data.description);
        setUpdatedUnitPrice(parseFloat(productRecord.data.unitPrice));
        setUpdatedQtyOnHand(parseFloat(productRecord.data.qtyOnHand));
        setModalState(true)
    }

    const updateProduct = async () => {
        try {
            await AxiosInstance.put('/products/update/' + selectedProductId, {
                name: updatedName,
                description: updatedDescription,
                unitPrice: updatedUnitPrice,
                qtyOnHand: updatedQtyOnHand
            });
            setModalState(false);
            findAllProducts();
        } catch (error) {
            console.error(error);
        }
    }

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
                            <input value={name} type="text" onChange={(e) => setName(e.target.value)}
                                   className='form-control'
                                   id='productName'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="price" className="mb-1">Unit Price</label>
                            <input value={unitPrice} type="number"
                                   onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
                                   className='form-control' id='price' min={0}/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="qty" className="mb-1">QTY on Hand</label>
                            <input value={qtyOnHand} type="number"
                                   onChange={(e) => setQtyOnHand(parseFloat(e.target.value))}
                                   className='form-control' id='qty' min={0}/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4" style={productStyleObj}>
                        <div className="form-group">
                            <label htmlFor="image" className="mb-1">Product Image</label>
                            <input type="file" onChange={handleFile} className='form-control' id='image'/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="description" className="mb-1">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5}
                                      className='form-control'
                                      id='description'/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <button className='btn btn-primary col-12' onClick={saveProduct}>Save Product</button>
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
                            {products.map((product, index) =>
                                <tr key={index}>
                                    <td>#{index}</td>
                                    <td>{product.name}</td>
                                    <td>{product.qtyOnHand}</td>
                                    <td>{product.unitPrice}</td>
                                    <td>
                                        <button onClick={() => {
                                            loadModal(product._id)
                                        }} className="btn btn-outline-success btn-sm">Update
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            if (confirm('Are you Sure?')) {
                                                deleteProduct(product._id)
                                            }
                                        }} className="btn btn-outline-danger btn-sm">Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-info btn-sm">View</button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <Modal show={modalState}>
                <div className='p-4'>
                    <h3>Edit Details</h3>
                    <hr className='mb-4'/>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <input type="text" defaultValue={updatedName}
                                   onChange={(e) => setUpdatedName(e.target.value)}
                                   className='form-control' placeholder='Product Name'/>
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <input type="number" defaultValue={updatedUnitPrice}
                                   onChange={(e) => setUpdatedUnitPrice(parseFloat(e.target.value))}
                                   className='form-control' placeholder='Unit Price' min={0}/>
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <input type="number" defaultValue={updatedQtyOnHand}
                                   onChange={(e) => setUpdatedQtyOnHand(parseFloat(e.target.value))}
                                   className='form-control' placeholder='QTY on Hand' min={0}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <textarea defaultValue={updatedDescription}
                                      onChange={(e) => setUpdatedDescription(e.target.value)}
                                      className='form-control' placeholder='Product Description'/>
                        </div>
                    </div>
                    <br/>
                    <div className="col-12 d-flex justify-content-end">
                        <button onClick={() => setModalState(false)} type='button' className='btn btn-secondary'
                                style={{marginRight: '10px'}}>Close
                        </button>
                        <button type='button' className='btn btn-success' onClick={() => updateProduct()}>
                            Update Product
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ProductComponent



