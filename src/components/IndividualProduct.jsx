import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {message} from "antd";
import {getProductData} from "../api/UserProducts";
import Loading from "./Loading";
import ProductCard from "./productCard";

const IndividualProduct = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [productData, setProductData] = useState([])

    const getData = async() => {
        try{
            setLoading(true)
            const productData = await getProductData(id)
            setLoading(false)

            console.log(productData)
            setProductData(productData)

        }catch (error){
            message.error("Unable to fetch Product's Data")
            console.log("Unable to fetch Product's Data", error)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            {loading && <Loading/>}
            <ProductCard product={productData} />
        </>
    )
}

export default IndividualProduct