import React, { useEffect, useState } from 'react';
import {Button, message, Space, Table, Popconfirm, Flex, InputNumber, Collapse} from 'antd';
import { getAuth } from 'firebase/auth';
import {removeProductFromCart, getOrdersData} from "../api/UserProducts";

const App = () => {
    const auth = getAuth();
    const [ordersData, setOrdersdata] = useState([]);
    const [items, setItems] = useState([])

    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl) => <img width={"80px"} src={imageUrl} alt="Product" />,
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Quantity Ordered',
            dataIndex: 'quantityOrdered',
            key: 'quantityOrdered',
        },
        {
            title: 'Price',
            key: 'price',
            render: (_, record) => {
                const totalPrice = record.price * (record.quantityOrdered || 1);
                return <span>{totalPrice}</span>;
            },
        },
    ];

    const getData = async () => {
        try {
            const ordersData = await getOrdersData(auth.currentUser.uid);
            setOrdersdata(ordersData)
            console.log(ordersData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;

        ordersData.forEach(item => {
            // Check if quantityOrdered exists, default it to 1 if it doesn't
            const quantity = item.quantityOrdered ? item.quantityOrdered : 1;
            // Calculate the total price for each item by multiplying its quantity with its price
            const itemTotalPrice = item.price * quantity;
            // Add the total price of the current item to the totalPrice variable
            totalPrice += itemTotalPrice;
        });

        return totalPrice;
    };

    const genExtra = (status) => {
        return (
            <Button type="text">{status ? status : "Awaiting Confirmation"}</Button>
        );
    };
    const setItemsForDisplay = () => {
        const items = ordersData.map((order, index) => ({
            key: order.id, // Assuming each order has an ID
            label: order.id, // Display order index starting from 1
            children: (
                <div>
                    <Table columns={columns} dataSource={order?.products} />
                    {/*<p>Order ID: {order.id}</p>*/}
                    {/*<p>Order Date: {order.date}</p>*/}
                </div>
            ),
            extra : genExtra(order.status)
        }))

        return items
    }

    useEffect(() => {
       setItems(setItemsForDisplay())
       getData();
    }, [ordersData]);

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <>
            <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
        </>
    );
}

export default App;
