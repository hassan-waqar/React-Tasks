import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    arrayUnion,
    collection,
    arrayRemove,
    addDoc,
    query,
    where

} from 'firebase/firestore';

export const fetchData = async () => {
    const db = getFirestore();
    try {
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(productsRef);

        const productsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        return productsData
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};
export const addProductToCart = async (userId, productId) => {
    const db = getFirestore();
    const userCartRef = doc(db, 'carts', userId);

    try {
        // Check if the user's cart document exists
        const userCartSnapshot = await getDoc(userCartRef);

        if (userCartSnapshot.exists()) {
            // User's cart document exists, update the array of products
            await updateDoc(userCartRef, {
                products: arrayUnion(productId) // Add the productId to the products array
            });
        } else {
            // User's cart document does not exist, create a new document
            await setDoc(userCartRef, { userId, products: [productId] });
        }

        console.log('Product added to cart successfully.');
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
};
export const getCartData = async (userId) => {
    const db = getFirestore();
    const userCartRef = doc(db, 'carts', userId);


    try {
        // Get the user's cart document
        const userCartSnapshot = await getDoc(userCartRef);

        if (userCartSnapshot.exists()) {
            // User's cart document exists, fetch the product objects from Firestore
            const userData = userCartSnapshot.data();
            const productIds = userData.products || [];

            // Fetch product objects for each product ID
            const products = await Promise.all(productIds.map(async (productId) => {
                const productRef = doc(db, 'products', productId);
                const productSnapshot = await getDoc(productRef);
                if (productSnapshot.exists()) {
                    // Include the product ID in the product data
                    const productData = productSnapshot.data();
                    return { ...productData, id: productId };
                } else {
                    console.log(`Product with ID ${productId} not found.`);
                    return null;
                }
            }));

            // Filter out null values (products not found)
            const validProducts = products.filter(product => product !== null);
            return validProducts;
        }else {
            // User's cart document does not exist
            console.log('User cart not found.');
            return [];
        }
    } catch (error) {
        console.error('Error getting cart data:', error);
        return [];
    }
};

export const updateCart = async(cartData) => {
    console.log(cartData)
}

export const emptyCart = async(userId) => {

}

export const removeProductFromCart = async (userId, productId) => {
    const db = getFirestore();
    const userCartRef = doc(db, 'carts', userId);

    try {
        // Get the user's cart document
        const userCartSnapshot = await getDoc(userCartRef);

        if (userCartSnapshot.exists()) {
            console.log(productId)
            // User's cart document exists, remove the product ID from the array
            await updateDoc(userCartRef, {
                products: arrayRemove(productId) // Remove the productId from the products array
            });

            console.log('Product removed from cart successfully.');
        } else {
            // User's cart document does not exist
            console.log('User cart not found.');
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
    }
};

export const placeOrderUser = async (userId, products) => {
    const db = getFirestore();
    try {
        console.log(products)
        // Add a new order document to the "orders" collection
        const orderRef = await addDoc(collection(db, 'orders'), {
            userId: userId,
            products: products
        });

        console.log('Order placed successfully with ID:', orderRef.id);
        return orderRef.id; // Return the ID of the newly created order
    } catch (error) {
        console.error('Error placing order:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};

export const getOrdersData = async (userId) => {
    try {
        const db = getFirestore();
        const userOrdersQuery = query(collection(db, 'orders'), where('userId', '==', userId));
        const ordersSnapshot = await getDocs(userOrdersQuery);

        if (!ordersSnapshot.empty) {
            const orders = [];
            for (const orderDoc of ordersSnapshot.docs) {
                const orderData = orderDoc.data();
                const products = [];
                for (const productRef of orderData.products) {
                    try {
                        const productDoc = await getDoc(doc(db, 'products', productRef.id));
                        if (productDoc.exists()) {
                            products.push({ id: productDoc.id, quantityOrdered: productRef.quantityOrdered, ...productDoc.data() });
                        } else {
                            console.log(`Product with ID ${productRef.id} not found.`);
                        }
                    } catch (error) {
                        console.error('Error fetching product:', error);
                    }
                }
                orders.push({ id: orderDoc.id, products, status: orderData.status });
            }
            return orders;
        } else {
            console.log('User orders not found.');
            return [];
        }
    } catch(error){
        console.error('Error Fetching User Orders:', error);
    }
}

export const getAllOrders = async () => {
    try {
        const db = getFirestore();
        const ordersRef = collection(db, 'orders');
        const ordersSnapshot = await getDocs(ordersRef);

        const orders = [];
        if (!ordersSnapshot.empty) {
            for (const orderDoc of ordersSnapshot.docs) {
                const orderData = orderDoc.data();
                console.log(orderData)
                const products = [];
                for (const productRef of orderData.products) {
                    try {
                        const productDoc = await getDoc(doc(db, 'products', productRef.id));
                        if (productDoc.exists()) {
                            products.push({ id: productDoc.id, quantityOrdered: productRef.quantityOrdered, ...productDoc.data() });
                        } else {
                            console.log(`Product with ID ${productRef.id} not found.`);
                        }
                    } catch (error) {
                        console.error('Error fetching product:', error);
                    }
                }
                orders.push({ id: orderDoc.id, products, status: orderData.status });

            }
        }

        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};

export const changeStatus = async (order, status) => {
    try {
        const db = getFirestore();
        const orderRef = doc(db, 'orders', order.id);

        // Update the status field of the order document
        await setDoc(orderRef, { status }, { merge: true });

        console.log(`Status of order ${order.id} changed to ${status}`);
    } catch (error) {
        console.error('Error changing status:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};