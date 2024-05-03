import React, { useEffect, useState } from 'react';
import {Button, message, Space, Table, Select, Popconfirm, Flex, InputNumber, Collapse, Menu, Dropdown} from 'antd';
import { getAuth } from 'firebase/auth';
import {removeProductFromCart, getOrdersData, getAllOrders, changeStatus} from "../api/UserProducts";
import Loading from "./Loading";
const { Option } = Select;
const AdminOrders = () => {
    const auth = getAuth();
    const [ordersData, setOrdersdata] = useState([]);
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

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
            const ordersData = await getAllOrders();
            setLoading(true)
            setOrdersdata(ordersData)
            setLoading(false)
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

    const genExtra = (order) => {
        const status = order.status;
        console.log(order)

        const handleMenuClick = (newStatus) => {
            // Make API call to change the status of the order
            changeStatus(order, newStatus);
        };

        return (
            <Select
                defaultValue={status || "Awaiting Confirmation"}
                onChange={handleMenuClick}
            >
                <Option value="Confirmed">Confirmed</Option>
                <Option value="Shipped">Shipped</Option>
                <Option value="Delivered">Delivered</Option>
            </Select>
        );
    };
    const setItemsForDisplay = () => {
        const items = ordersData.map((order, index) => ({
            key: order.id, // Assuming each order has an ID
            label: order.id, // Display order index starting from 1
            children: (
                <div>
                    <Table columns={columns} dataSource={order?.products} />
                </div>
            ),
            extra : genExtra(order)
        }))

        return items
    }

    useEffect(() => {
        // if(!loading) return () => <Loading/>
        getData();
    }, []);

    useEffect(() => {
        setItems(setItemsForDisplay())
    }, [ordersData]);

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <>
            {loading && <Loading />}
            <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
        </>
    );
}

export default AdminOrders;