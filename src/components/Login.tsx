import React, {useState} from "react";
import AxiosInstance from "../config/axiosInstance";
import {Link} from "react-router-dom";

const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const response = await AxiosInstance.post('http://localhost:3000/api/v1/users/login', {
                email, password
            });

            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 2);

            const cookieValue = encodeURIComponent('token') + '=' + encodeURIComponent(response.data)
                + '; expires=' + expirationDate.toUTCString() + '; path=/';
            document.cookie = cookieValue

            console.log(response.data)

            setEmail('');
            setPassword('');

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="container mt-5">
                <h3>User Login</h3>
                <div className="row mt-4">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" onChange={(e) => {
                                setEmail(e.target.value)
                            }} className="form-control" placeholder='Email Here'/>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={(e) => {
                                setPassword(e.target.value)
                            }} className="form-control" placeholder='Password Here'/>
                        </div>
                    </div>

                    <div className="col-12">
                        <button className='btn btn-primary col-12 mt-5' onClick={login}>Login</button>
                        <Link to='/signup' className='btn btn-outline-dark col-12 mt-3'>Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
