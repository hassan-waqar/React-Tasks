import React, {useEffect, useState} from 'react';
import {Button, Card, Flex, InputNumber, message, Label} from 'antd';
import { getAuth } from 'firebase/auth';
import { addProductToCart} from "../api/UserProducts";
import { useNavigate} from "react-router-dom";

const { Meta } = Card;

const App = ({product}) => {
    const navigate = useNavigate()
    const auth = getAuth();
    const [quantity, setQuantity] = useState(1)

    const addToCart = async () => {
        console.log(quantity)
        console.log(auth.currentUser.uid)
        console.log(product.id)
        try {
            await addProductToCart(auth.currentUser.uid, product.id, quantity)
            message.success("Added To Cart")
        }catch (e) {
            message.error("Added To Cart Failed")
            console.error('Error Uploading data:', e);
        }
        setQuantity(1)
    }


    return (

        <Card

            hoverable
            style={{
                width: 240,
            }}
            cover={<img alt="example" src={product.imageUrl} style={{height: "250px", objectFit: "cover"}}/>}
            onClick={() => navigate(`/user/product/${product.id}`)}
        >
            <Flex style={{flexDirection: "column"}}>
                <Meta title={product.name} description={`Rs. ${product.price}`} />
                <Flex style={{justifyContent: "space-between", alignItems: "center", marginTop: 3}}>
                    <span style={{fontSize: "16px"}}> Quantity </span>
                    <InputNumber size="large" min={1} max={10} defaultValue={quantity} onChange={(value) => setQuantity(value)}/>
                </Flex>
                <Button style={{marginTop : 15}} onClick={addToCart}>Add To Cart</Button>

            </Flex>
        </Card>
    );
}
export default App;