import React, { useState, useEffect } from "react";
import {fetchData} from "../api/UserProducts";
import ProductCard from "./productCard";
import {Col, Flex, Row} from "antd";



const UserProducts = () => {
    const [products, setProducts] = useState([]);



    const getData = async () => {
        try {
            const productsData = await fetchData();
            setProducts(productsData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            {/*<h2>User Products</h2>*/}
            <Row gutter={30}>
                {products.map((product) => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>

        </div>
    );
};

export default UserProducts;
