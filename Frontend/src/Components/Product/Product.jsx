import { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
// eslint-disable-next-line react/prop-types
const Product = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/products`);
                setProducts(response.data);
                // console.log(response.data)
            } catch (err) {
                setError(err);
            }
        };

        fetchProducts();
    }, []);
    // console.log(products)

    const handleAddToCart = async (productId, price, image) => {
        if (!user) {
            alert('You need to be logged in to add items to the cart');
            return;
        }

        const token = Cookies.get('authToken');

        try {
            const quantity = 1;
            await axios.post(
                `${window.location.origin}/api/cart/add`,
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

    return (
        <div>
            <h2 id="product-page-heading">All Products</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="allproducts">
                {
                    products.map((item, i) => {
                        return (
                            <div className='item1' key={i}>
                                <Link to={`/products/productinfo/${item._id}`}>
                                    <img src={item.image} alt="" />
                                    <p>{item.name}</p>
                                    <div className="item-prices">
                                        <div className="item-price-new">
                                            ${item.price}
                                        </div>
                                    </div>
                                </Link>
                                <button className='cart-button1' onClick={() => handleAddToCart(item._id, item.price, item.image)}>Add to Cart</button>
                                {/* {console.log(item._id)} */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Product;
