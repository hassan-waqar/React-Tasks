import React, { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import {List, Card, Skeleton, Avatar, Image, Table} from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import {Button, Flex, message, Upload} from 'antd';

import { Col, Form, Input, Row, Select, Space, theme } from 'antd';

const db = getFirestore();
const storage = getStorage();

const AdminProducts = () => {
    const [productId, setProductId] = useState('')
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [imageObj, setImageObj] = useState(null);
    const [products, setProducts] = useState([]);
    const [editMode, setEditMode] = useState(false)
    const [isImageUpdated, setIsImageUpdated] = useState(false)

    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const getFields = () => {

        const props = {
            name: 'file',
            action: true,
            onChange(info) {
                setIsImageUpdated(true)
                if (!imageObj) {
                    setImageObj(info.file.originFileObj);
                    info.file.status = 'done';
                }

                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                }

            },
            onRemove(file) {
                // Remove the imageObj when the image is deleted
                setImageObj(null);
            },
        };


        const children = [];
        children.push(
            <Col span={8} key={1}>
                <Form.Item
                    name={"product-name"}
                    label={"Product Name"}
                    rules={[
                        {
                            required: true,
                            message: `Please input ${"Product Name"}!`,
                        },
                    ]}
                >
                    <Input placeholder={`Enter ${"Product Name"}`} type="text" value={productName} onChange={(e) => setProductName(e.target.value)}/>

                </Form.Item>
            </Col>
        );
        children.push(
            <Col span={8} key={2}>
                <Form.Item
                    name={"product-price"}
                    label={"Product Price"}
                    rules={[
                        {
                            required: true,
                            message: `Please input ${"Product Price"}!`,
                        },
                    ]}
                >
                    <Input placeholder={`Enter ${"Product Price"}`} type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/>
                </Form.Item>
            </Col>
        );
        children.push(
            <Col span={8} key={3}>
                <Form.Item
                    name={"product-quantity"}
                    label={"Product Quantity"}
                    rules={[
                        {
                            required: true,
                            message: `Please input ${"Product Quantity"}!`,
                        },
                    ]}
                >
                    <Input placeholder={`Enter ${"Product Quantity"}`} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                </Form.Item>
            </Col>
        );
        children.push(
            <Col span={8} key={4}>
                <Form.Item
                    name={"product-image"}
                    label={"Product Image"}
                    rules={[
                        {
                            required: true,
                            message: `Please input ${"Product Image"}!`,
                        },
                    ]}
                >
                    <Upload {...props} fileList={imageObj ? [imageObj] : []}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
            </Col>
        );

        return children;
    };

    const uploadImageAndGetUrl = async (imageFile) => {
        try {
            // Upload the image file to Firebase Storage
            const imageRef = ref(storage, `images/${imageFile?.name}`);
            const uploadTask = uploadBytesResumable(imageRef, imageFile);

            // Using Promise to wait for the upload to complete
            return new Promise((resolve, reject) => {
                uploadTask.on('state_changed', null, (error) => {
                    console.error('Error uploading image:', error);
                    reject(error);
                }, async () => {
                    // Upload completed successfully, get the download URL
                    const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log(imageUrl)
                    setImageUrl(imageUrl); // Set the imageUrl state
                    resolve(imageUrl);
                });
            });
        } catch (error) {
            console.error('Error uploading image and getting URL: ', error);
            throw error;
        }
    };

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        if(editMode){
            updateProduct();
        }else {
            addProduct();
        }
    };

    const updateProduct = async () => {
        try {
            const productRef = doc(db, 'products', productId);

            // Check if the image object is modified
            let imageUrl = '';
            if (isImageUpdated) {
                // If imageObj exists, upload the image and get the URL
                imageUrl = await uploadImageAndGetUrl(imageObj);
            } else {
                // If imageObj is not modified, get the existing image URL
                const productSnapshot = await getDoc(productRef);
                const productData = productSnapshot.data();
                imageUrl = productData.imageUrl;
            }
            setIsImageUpdated(false)
            // Update other fields of the document with the new values
            await updateDoc(productRef, {
                name: productName,
                price: parseFloat(productPrice),
                quantity: quantity,
                imageUrl: imageUrl,
                // Add other fields as needed
            });

            message.success("Product successfully updated");
            form.resetFields();
            setImageUrl("")
            setImageObj(null)
            fetchData();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };


    const addProduct = async() => {
        console.log("Inside addProduct")
        try {
            const imageUrl = await uploadImageAndGetUrl(imageObj);
            console.log(imageUrl)
            if (!imageUrl) {
                console.error('Image URL is not available. Please upload an image.');
                return;
            }
            if (quantity < 0) {
                message.error("Quantity cannot be negative")
                return
            }
            if(productPrice < 0) {
                message.error("Price cannot be negative")
                return
            }

            await addProductToFirestore(imageUrl);
            message.success(`Product Added successfully`);
            form.resetFields();
            setImageUrl("")
            setImageObj(null)
            fetchData(); // Fetch data after adding the product
        } catch (error) {
            console.error('Error adding product: ', error);
        }
    }

    const addProductToFirestore = async (imageUrl) => {
        try {
            // Add product data to Firestore
            const productData = {
                name: productName,
                price: parseFloat(productPrice),
                quantity: quantity,
                imageUrl: imageUrl // Add imageUrl field
            };
            const docRef = await addDoc(collection(db, 'products'), productData);
            console.log('Document added with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document to Firestore: ', error);
            throw error;
        }
    };

    const fetchData = async () => {
        try {
            // Get a reference to the "products" collection
            const productsRef = collection(db, "products");

            // Fetch data from Firestore
            const querySnapshot = await getDocs(productsRef);

            // Extract data from query snapshot
            const productsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            // Update state with the retrieved products data
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        // Call the fetchData function initially
        fetchData();
    }, []);

    useEffect(() => {
        // Set form fields when editMode changes
        if (editMode) {
            form.setFieldsValue({
                'product-name': productName,
                'product-price': productPrice,
                'product-quantity': quantity,
                'product-image': imageUrl,
            });
        }
    }, [editMode]); // Trigger when editMode changes

    const handleEdit = (record) => {
        console.log(record)
        setEditMode(true);
        setProductId(record.id);
        setProductName(record.name)
        setProductPrice(record.price)
        setQuantity(record.quantity)
        setImageUrl(record.imageUrl)

        const imageRef = ref(storage, `images/${record.imageUrl}`);
        setImageObj(imageRef)

    }

    const handleDelete = async (record) => {
        try {
            // 1. Delete document from Firestore
            const productRef = doc(db, 'products', record.id);
            await deleteDoc(productRef);
            console.log('Document successfully deleted');

            // 2. Delete image from Firebase Storage
            deleteImage(record.imageUrl)

            message.success("Image Deleted Successfully");
            console.log('Image successfully deleted from Firebase Storage');
            fetchData();
        } catch (error) {
            console.error('Error deleting document and image:', error);
        }
    };

    const deleteImage = async (url) => {
        const imageRef = ref(storage, `images/${url}`);
        await deleteObject(imageRef);
    }

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
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
                <Row gutter={24}>{getFields()}</Row>
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Space size="small">
                        {!editMode ?
                            <Button type="primary" htmlType="submit">
                                Add Product
                            </Button> :
                            <Button htmlType="submit">
                                Update Product
                            </Button>}
                        <Button
                            onClick={() => {
                                form.resetFields();
                                setImageUrl("")
                                setImageObj(null)
                            }}
                        >
                            Clear
                        </Button>
                    </Space>
                </div>
            </Form>
            <Table columns={columns} dataSource={products} />;


        </>
    );
};

export default AdminProducts;
