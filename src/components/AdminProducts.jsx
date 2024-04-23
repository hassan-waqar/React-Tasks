import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore();
const storage = getStorage();

const AdminProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setProductImage(imageFile);
    };

    const addProduct = async () => {
        try {
            // Upload the image file to Firebase Storage
            const imageRef = ref(storage, `images/${productImage.name}`);
            const uploadTask = uploadBytesResumable(imageRef, productImage);
            uploadTask.on('state_changed', null, (error) => {
                console.error('Error uploading image:', error);
            }, async () => {
                // Upload completed successfully, get the download URL
                const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

                // Add product data to Firestore
                const productData = {
                    name: productName,
                    price: parseFloat(productPrice),
                    imageUrl: imageUrl // Add imageUrl field
                };
                const docRef = await addDoc(collection(db, 'products'), productData);
                console.log('Document added with ID: ', docRef.id);
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <>
            <h1>Admin Products</h1>
            <div>
                <label>Product Name:</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div>
                <label>Product Price:</label>
                <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            </div>
            <div>
                <label>Product Image:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <button onClick={addProduct}>Add Product</button>
        </>
    );
};

export default AdminProducts;
