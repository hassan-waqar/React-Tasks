import { getFirestore, doc, getDoc,getDocs, setDoc, updateDoc, arrayUnion, collection, arrayRemove } from 'firebase/firestore';

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