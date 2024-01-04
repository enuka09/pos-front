import React, {useState} from "react";
import AxiosInstance from "../config/axiosInstance";
import {Link} from "react-router-dom";

const Signup: React.FC = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signup = async () => {
        try {
            const response = await AxiosInstance.post('http://localhost:3000/api/v1/users/register', {
                fullName, email, password
            });
            console.log(response)

            setFullName('');
            setEmail('');
            setPassword('');

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="container mt-5">
                <h3>User Registration</h3>
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" onChange={(e) => {
                                setFullName(e.target.value)
                            }} className="form-control" placeholder='Full Name Here'/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" onChange={(e) => {
                                setEmail(e.target.value)
                            }} className="form-control" placeholder='Email Here'/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={(e) => {
                                setPassword(e.target.value)
                            }} className="form-control" placeholder='Password Here'/>
                        </div>
                    </div>

                    <div className="col-12">
                        <button className='btn btn-primary col-12 mt-5' onClick={signup}>Register Now</button>
                        <Link to='/login' className='btn btn-outline-dark col-12 mt-3'>Already have an Account?</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup