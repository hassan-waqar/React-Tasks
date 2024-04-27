import React from 'react';
import {Button, Card, Flex, message} from 'antd';
import { getAuth } from 'firebase/auth';
import { addProductToCart} from "../api/UserProducts";

const { Meta } = Card;

const App = ({product}) => {
    const auth = getAuth();

    const addToCart = async () => {
        console.log(auth.currentUser.uid)
        console.log(product.id)
        try {
            await addProductToCart(auth.currentUser.uid, product.id)
            message.success("Added To Cart")
        }catch (e) {
            message.error("Added To Cart Failed")
            console.error('Error Uploading data:', e);
        }
    }

    return (
        <Card
            hoverable
            style={{
                width: 240,
            }}
            cover={<img alt="example" src={product.imageUrl} style={{height: "250px", objectFit: "cover"}}/>}
        >
            <Flex style={{flexDirection: "column"}}>
                <Meta title={product.name} description={`Rs. ${product.price}`} />
                <Button style={{marginTop : 20}} onClick={addToCart}>Add To Cart</Button>
            </Flex>
        </Card>
    );
}
export default App;