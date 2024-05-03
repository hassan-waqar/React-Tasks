import React, { useEffect, useState } from 'react';
import {Button, message, Space, Table, Popconfirm, Flex, InputNumber} from 'antd';
import { getAuth } from 'firebase/auth';
import {placeOrderUser, getCartData, removeProductFromCart, updateCart} from "../api/UserProducts";
import PlaceOrder from "./PlaceOrder";
import Loading from "./Loading";

const App = () => {
    const auth = getAuth();
    const [cartData, setCartdata] = useState([]);
    const [open, setOpen] = useState({});
    const [confirmLoading, setConfirmLoading] = useState({});
    const [quantityChanged, setQuantityChanged] = useState();
    const [totalPrice, setTotalPrice] = useState(0)
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
            title: 'Quantity',
            // dataIndex: 'quantity',
            key: 'quantityOrdered',
            render: (_, record, recordIndex) => {

                return (
                    <InputNumber
                        min={1}
                        max={10}
                        defaultValue={record.quantityOrdered || 1} // Use record's quantity if available, otherwise use default value
                        onChange={async (value) => {
                            const updatedCartData = cartData.map((item, index) => {
                                if (index === recordIndex) {
                                    // Update the quantityOrdered property for the specified record
                                    return { ...item, quantityOrdered: value };
                                }
                                return item;
                            });
                            await updateCart(updatedCartData)
                            setCartdata(updatedCartData);
                            setQuantityChanged(true)
                        }}
                    />
                )
            },

        },
        {
            title: 'Price',
            key: 'price',
            render: (_, record) => {
                const totalPrice = record.price * (record.quantityOrdered || 1);
                setQuantityChanged(false)
                return <span>{totalPrice}</span>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure you want to delete this product?"
                        open={open[record.id]}
                        onConfirm={() => handleRemoveFromCart(record)}
                        okButtonProps={{ loading: confirmLoading[record.id] }}
                        onCancel={() => handleCancel(record.id)}
                    >
                        <Button danger onClick={() => showPopconfirm(record.id)}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const getData = async () => {
        try {
            setLoading(true)
            const cartData = await getCartData(auth.currentUser.uid);
            setLoading(false)
            setCartdata(cartData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const showPopconfirm = (productId) => {
        setOpen({ ...confirmLoading, [productId]: true });
    };

    const handleCancel = (productId) => {
        setOpen({ ...confirmLoading, [productId]: false });
    };

    const handleRemoveFromCart = async (record) => {
        try {
            setConfirmLoading({ ...confirmLoading, [record.id]: true });
            await removeProductFromCart(auth.currentUser.uid, record.id);
            message.success("Product Removed From Cart")
            getData();
        } catch (error) {
            console.error('Error removing product:', error);
        } finally {
            setConfirmLoading({ ...confirmLoading, [record.id]: false });
        }
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0;

        cartData.forEach(item => {
            // Check if quantityOrdered exists, default it to 1 if it doesn't
            const quantity = item.quantityOrdered ? item.quantityOrdered : 1;
            // Calculate the total price for each item by multiplying its quantity with its price
            const itemTotalPrice = item.price * quantity;
            // Add the total price of the current item to the totalPrice variable
            totalPrice += itemTotalPrice;
        });

        return totalPrice;
    };


    useEffect(() => {
        getData();
        setTotalPrice(calculateTotalPrice())
    }, []);

    useEffect(() => {
        setTotalPrice(calculateTotalPrice())
    },[quantityChanged])

    const placeOrder = async () => {
        try {
            // Extract product IDs from cartData
            const products = cartData.map(product => ({
                id: product.id,
                quantityOrdered: product.quantityOrdered || 1 // Treat undefined quantity as 1
            }));

            // Add products to the cart
            await placeOrderUser(auth.currentUser.uid, products);

            message.success("Order Placed Successfully");
            setCartdata([])
        } catch (error) {
            message.error("Failed to place order");
            console.error('Error uploading data:', error);
        }
    };

    return (
        <>
            {loading
                ?<Loading/>
                :<><Table columns={columns} dataSource={cartData} />
                    <Flex style={{flexDirection: "row-reverse", justifyContent: "center"}}>
                        <PlaceOrder totalPrice={totalPrice} placeOrder={placeOrder}/>
                    </Flex></>}
        </>
    );
}

export default App;
