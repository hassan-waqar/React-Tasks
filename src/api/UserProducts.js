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
export const addProductToCart = async (userId, productId, quantity) => {
    const db = getFirestore();
    const userCartRef = doc(db, 'carts', userId);

    try {
        // Check if the user's cart document exists
        const userCartSnapshot = await getDoc(userCartRef);

        if (userCartSnapshot.exists()) {
            // User's cart document exists, check if the product already exists in the cart
            const userCartData = userCartSnapshot.data();
            const existingProductIndex = userCartData.products.findIndex(product => product.productId === productId);

            if (existingProductIndex !== -1) {
                // Product already exists, update its quantity
                const updatedProducts = [...userCartData.products];
                updatedProducts[existingProductIndex].quantity += quantity;

                await updateDoc(userCartRef, { products: updatedProducts });
            } else {
                // Product doesn't exist, add it as a new product
                await updateDoc(userCartRef, {
                    products: arrayUnion({ productId, quantity }),
                });
            }
        } else {
            // User's cart document does not exist, create a new document with the product
            await setDoc(userCartRef, { userId, products: [{ productId, quantity }] });
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
            const productsInCart = userData.products || [];

            // Fetch product objects for each product ID
            const products = await Promise.all(productsInCart.map(async (productItem) => {
                const productId = productItem.productId;
                const productQuantity = productItem.quantity;

                const productRef = doc(db, 'products', productId);
                const productSnapshot = await getDoc(productRef);

                if (productSnapshot.exists()) {
                    // Include the product ID and quantity in the product data
                    const productData = productSnapshot.data();
                    return { ...productData, id: productId, quantityOrdered: productQuantity };
                } else {
                    console.log(`Product with ID ${productId} not found.`);
                    return null;
                }
            }));

            // Filter out null values (products not found)
            const validProducts = products.filter(product => product !== null);
            console.log(validProducts)
            return validProducts;
        } else {
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

export const emptyCart = async (userId) => {
    const db = getFirestore();
    const userCartRef = doc(db, 'carts', userId);

    try {
        // Update the user's cart document to remove all products
        await updateDoc(userCartRef, { products: [] });
        console.log('Cart emptied successfully.');
    } catch (error) {
        console.error('Error emptying cart:', error);
    }
};

export const removeProductFromCart = async (userId, productId) => {
    const db = getFirestore();
    const userCartRef = doc(db, 'carts', userId);

    try {
        // Get the user's cart document
        const userCartSnapshot = await getDoc(userCartRef);

        if (userCartSnapshot.exists()) {
            // User's cart document exists, fetch the products array
            const userData = userCartSnapshot.data();
            let updatedProducts = userData.products || [];

            // Find the index of the product with the matching productId
            const index = updatedProducts.findIndex(product => product.productId === productId);

            if (index !== -1) {
                // Remove the product from the array if found
                updatedProducts.splice(index, 1);

                // Update the cart document with the updated products array
                await updateDoc(userCartRef, { products: updatedProducts });

                console.log('Product removed from cart successfully.');
            } else {
                console.log('Product not found in cart.');
            }
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
        await emptyCart(userId);
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

export const getProductData = async (id) => {
    try {
        const db = getFirestore();
        const productRef = doc(db, 'products', id);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
            // Product document exists, return its data
            return productSnapshot.data();
        } else {
            console.log(`Product with ID ${id} not found.`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
        throw error;
    }
}