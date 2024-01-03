import DefaultCard from "./cards/DefaultCard.tsx";
import DefaultChart from "./cards/DefaultChart.tsx";
import MinQtyCard from "./cards/MinQtyCard";
import axios from "axios";
import {useEffect, useState} from "react";
import Product from "../models/ProductModel"

const Home: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [productCount, setProductCount] = useState<number>()
    const [customerCount, setCustomerCount] = useState<number>()
    const [orderCount, setOrderCount] = useState<number>()
    const [income, setIncome] = useState<number>()

    useEffect(() => {
        findAllProducts()
        findAllCount()
    }, [])

    const findAllProducts = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/products/find-all-min');
        setProducts(response.data);
    }

    const findAllCount = async () => {
        const productCount = await axios.get('http://localhost:3000/api/v1/products/find-all-count');
        setProductCount(productCount.data)

        const customerCount = await axios.get('http://localhost:3000/api/v1/customers/find-all-count');
        setCustomerCount(customerCount.data)

        const orderCount = await axios.get('http://localhost:3000/api/v1/orders/find-all-count');
        setOrderCount(orderCount.data)

        const income = await axios.get('http://localhost:3000/api/v1/orders/find-income');
        setIncome(income.data.totalCostSum);
    }

    return (
        <>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/young-woman-shopping-clothes_23-2149187291.jpg?w=360&t=st=1703615967~exp=1703616567~hmac=356ac9e6c8b2c45e8cf13a73c1004b7781084321c223528251ddf6a329787837'
                            description='This includes the Customer Details'
                            title='Customers'
                            value={customerCount}
                            key={1}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/black-friday-composition-bags-shopping-cart_23-2147709342.jpg?w=360&t=st=1703617131~exp=1703617731~hmac=17fec8d595f699527242f0501cce7fbd3f05d61287909c748644ba67733dc6d7'
                            description='This includes the Product Details'
                            title='Products'
                            value={productCount}
                            key={1}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/delivery-concept-portrait-handsome-african-american-delivery-man-courier-pushing-hand-truck-with-stack-boxes-isolated-grey-studio-background-copy-space_1258-1237.jpg?w=740&t=st=1703616932~exp=1703617532~hmac=bf4d7cd4fbab28e5fbef8c7de469a13d1ee935c18d585d05629f7b77c8b9bd92'
                            description='This includes the Order Details'
                            title='Orders'
                            value={orderCount}
                            key={1}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <DefaultCard
                            thumbnail='https://img.freepik.com/free-photo/close-up-education-economy-objects_23-2149113553.jpg?w=360&t=st=1703617240~exp=1703617840~hmac=d1da3724c6c091e3daa76b29894c92b7773a8bdabd78e1de04c3c45a101c4e68'
                            description='This includes the Income Details'
                            title='Income'
                            value={income}
                            key={1}
                        />
                    </div>
                </div>
                <br/>

                <div className="row">
                    <div className="col-12 col-md-9">
                        <div className="context">
                            <DefaultChart/>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        {products.map((product, index) => (
                            <MinQtyCard image={product.image} name={product.name} description={product.description}
                                        key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home

