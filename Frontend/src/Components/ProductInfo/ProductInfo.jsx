import { useParams } from "react-router-dom";
import './ProductInfo.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import ProductReviews from "../Review/ProductReview";

// eslint-disable-next-line react/prop-types
function ProductInfo({ user }) {
    const [product, setProduct] = useState(null);
    const [wishlistError, setWishlistError] = useState('');
    const params = useParams();

    // Fetch product information
    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/products/productinfo/${params.id}`, {
                    withCredentials: true,
                });
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            }
        };
        
        fetchProductInfo();
    }, [params.id]);
    useEffect(() => {
        axios.get(`${window.location.origin}/api/newarrivals/productinfo/${params.id}`)
        .then(function (response) {
                setProduct(response.data);
// console.log(product)
             
            })
            .catch(function (error) {

                console.log(error);
            })
         
     
    }, [params.id])
    const handleAddToCart = async (productId, price, image) => {
        if (!user) {
            alert('You need to be logged in to add items to the cart');
            return;
        }

        const token = Cookies.get('authToken');

        try {
            const quantity = 1;
            await axios.post(
                "http://localhost:3000/api/cart/add",
                // eslint-disable-next-line react/prop-types
                { userId: user._id, productId, quantity, price, image },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            alert('Product added to cart');
        } catch (err) {
            alert('Failed to add product to cart: ', err.message);
        }
    };

    const handleAddToWishlist = async (productId, image) => {
        const token = Cookies.get('authToken');

        try {
            await axios.post(
                'http://localhost:3000/api/wishlist',
                { productId, image },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            alert('Added to wishlist!');
        } catch (err) {
            setWishlistError('Failed to add to wishlist: ' + err.message);
        }
    };

    if (!product) {
        return <p>Loading product information...</p>;
    }

    return (
        <>
            <div className="breadcrum">
                Home <i className="fa-solid fa-greater-than"></i> Shop <i className="fa-solid fa-greater-than"></i> {product.category} <i className="fa-solid fa-greater-than"></i> {product.name}
            </div>
            <div className="product-section">
                <div className="product-images">
                    <div className="small">
                        <img src={product.image} alt={product.name} />
                        <img src={product.image} alt={product.name} />
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="big">
                        <img src={product.image} alt={product.name} />
                    </div>
                </div>
                <div className="product-details">
                    <h1>{product.name}</h1>
                    <p>{product.ratings}</p>
                    <p>{product.description}</p>
                    <p>${product.price ? product.price : product.newPrice}</p>
                    <button className='cart-button' onClick={() => handleAddToCart(product._id, product.price ? product.price : product.newPrice, product.image)}>Add to Cart</button>
                    <button className="wishlist-button" onClick={() => handleAddToWishlist(product._id, product.image)}>Add to Wishlist</button>
                    {wishlistError && <p style={{ color: 'red' }}>{wishlistError}</p>}
                </div>
            </div>
            <hr />
            <br />
            {/* eslint-disable-next-line react/prop-types */}
            {user ? <ProductReviews productId={product._id} user={user._id} /> : ""}
            <RelatedProducts id={product.category} />
        </>
    );
}

export default ProductInfo;
