import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore();


const UserProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
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

        // Call the fetchData function
        fetchData();
    }, []); // Empty dependency array ensures that the effect runs only once after component mount

    return (
        <div>
            <h2>User Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserProducts;
