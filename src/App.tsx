import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css'
import Product from "./components/Product";
import Home from "./components/Home";
import Customer from "./components/Customer";
import Order from "./components/Order";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Calculator from "./components/Calculator";


function App() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="navbar-brand">
                            <img src="https://www.unipeak.online/assets/img/logo.png" alt="logo" className='logo'/>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to='/' className="nav-link" >Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/customer' className="nav-link">Customers</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/product' className="nav-link">Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/orders' className="nav-link">Order Management</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/calc' className="nav-link">Calculator</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/customer' element={<Customer/>}/>
                    <Route path='/product' element={<Product/>}/>
                    <Route path='/orders' element={<Order/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/calc' element={<Calculator/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App