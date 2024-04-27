import React, {useEffect, useState} from 'react';
import {Button, message, Space, Table, Tag} from 'antd';
import { getAuth } from 'firebase/auth';
import {getCartData, removeProductFromCart} from "../api/UserProducts";


const App = () => {
    const auth = getAuth();
    const [cartData, setCartdata] = useState();

    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl) => <img width={"80px"} src={imageUrl}/>,
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleRemoveFromCart(record)}>Remove From Cart</Button>
                </Space>
            ),
        },
    ];

    const getData = async () => {
        try {
            const cartData = await getCartData(auth.currentUser.uid);
            setCartdata(cartData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleRemoveFromCart = async(record) => {
        try {
            console.log(record)
            await removeProductFromCart(auth.currentUser.uid, record.id);
            message.success("Product Removed From Cart")
            getData()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Table columns={columns} dataSource={cartData} />
    )
}
export default App;