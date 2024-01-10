import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store";
import {decrement, increment} from "../state/calc/manageSlice";

const Calculator: React.FC = () => {

    const counter = useSelector((state: RootState) => state.calculator.value);
    const dispatch = useDispatch();

    return (
        <>
            <div className="container mt-5 ">
                <h1 className='d-flex align-items-center justify-content-center'>[ {counter} ]</h1>
                <hr/>
                <div className="btn-container d-flex align-items-center justify-content-center">
                    <button onClick={() => dispatch(increment())} className='btn btn-primary w-25'>+</button>
                    &nbsp;
                    <button onClick={() => dispatch(decrement())} className='btn btn-success w-25'>-</button>
                </div>
            </div>
        </>
    )
};

export default Calculator;