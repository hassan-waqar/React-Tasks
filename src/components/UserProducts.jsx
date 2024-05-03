import React, { useState, useEffect } from "react";
import {fetchData} from "../api/UserProducts";
import ProductCard from "./productCard";
import {Col, Flex, Row} from "antd";
import Loading from "./Loading";


const UserProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)


    const getData = async () => {
        try {
            setLoading(true)
            const productsData = await fetchData();
            setLoading(false)
            setProducts(productsData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
        {
            loading ? (<Loading/>) :
                (<div>
                <Row gutter={30}>
                    {products.map((product) => (
                        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                            <ProductCard product={product}/>
                        </Col>
                    ))}
                </Row>

            </div>)
        }
        </>
    );
};

export default UserProducts;
