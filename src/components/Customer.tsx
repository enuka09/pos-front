import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import axios from "axios";

interface Customer {
    _id: string,
    name: string,
    address: string,
    salary: number
}

const Customer: React.FC = () => {

    const [customers, setCustomers] = useState<Customer[]>([])

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [salary, setSalary] = useState<number | ''>('');

    const [modalState, setModalState] = useState<boolean>(false);

    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [updatedAddress, setUpdatedAddress] = useState('');
    const [updatedSalary, setUpdatedSalary] = useState<number | ''>('');

    useEffect(() => {
        findAllCustomers()
    }, [])

    const findAllCustomers = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/customers/find-all?searchText=&page=1&size=10');
        setCustomers(response.data)
    }

    const saveCustomer = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/customers/create', {
                name, address, salary
            });
            console.log(response)
            setName('');
            setAddress('');
            setSalary('');
        } catch (e) {
            console.log(e)
        }
    }

    const deleteCustomer = async (id) => {
        await axios.delete('http://localhost:3000/api/v1/customers/delete-by-id/' + id);
    }

    const loadModal = async (id) => {
        const customerRecord = await axios.get('http://localhost:3000/api/v1/customers/find-by-id/' + id);
        setSelectedCustomerId(customerRecord.data._id)
        setUpdatedName(customerRecord.data.name);
        setUpdatedAddress(customerRecord.data.address);
        setUpdatedSalary(parseFloat(customerRecord.data.salary));
        setModalState(true)
    }

    const updateCustomer = async () => {
        try {
            await axios.put('http://localhost:3000/api/v1/customers/update/' + selectedCustomerId, {
                name: updatedName, address: updatedAddress, salary: updatedSalary
            });
            setModalState(false);
            findAllCustomers();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <br/>
            <div className="container">
                <h1>Customer Details</h1>
                <br/>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="customerName" className="mb-1">Customer Name</label>
                            <input value={name} onChange={(e) => {
                                setName(e.target.value)
                            }} type="text" className='form-control' id='customerName'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="customerAddress" className="mb-1">Customer Address</label>
                            <input value={address} onChange={(e) => {
                                setAddress(e.target.value)
                            }} type="text" className='form-control' id='customerAddress'/>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="form-group">
                            <label htmlFor="customerSalary" className="mb-1">Salary</label>
                            <input value={salary} onChange={(e) => {
                                setSalary(e.target.value == '' ? '' : parseFloat(e.target.value))
                            }} type="number" className='form-control' id='customerSalary' min={0}/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12">
                        <button onClick={saveCustomer} className='btn btn-primary col-12'>Save Customer</button>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <form className='col-12' action="">
                            <input type="search" className="form-control" placeholder="Search Customers Here ..."/>
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
                                <th>Name</th>
                                <th>Address</th>
                                <th>Salary</th>
                                <th>Update Option</th>
                                <th>Delete Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers.map((customer, index) =>
                                <tr key={index}>
                                    <td>#{index}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.salary}</td>
                                    <td>
                                        <button onClick={() => {
                                            loadModal(customer._id)
                                        }} className="btn btn-outline-success btn-sm">Update
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            if (confirm('Are you Sure?')) {
                                                deleteCustomer(customer._id)
                                            }
                                        }} className="btn btn-outline-danger btn-sm">Delete
                                        </button>
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
                                   className='form-control' placeholder='Customer Name'/>
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <div className="form-group">
                            <input type="text" defaultValue={updatedAddress}
                                   onChange={(e) => setUpdatedAddress(e.target.value)}
                                   className='form-control' placeholder='Customer Address'/>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input type="number" defaultValue={updatedSalary}
                                   onChange={(e) => setUpdatedSalary(parseFloat(e.target.value))}
                                   className='form-control' placeholder='Salary'/>
                        </div>
                    </div>
                    <br/>
                    <div className="col-12 d-flex justify-content-end">
                        <button onClick={() => setModalState(false)} type='button' className='btn btn-secondary'
                                style={{marginRight: '10px'}}>Close
                        </button>
                        <button type='button' className='btn btn-success' onClick={() => updateCustomer()}>
                            Update Customer
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Customer