import { Link, useParams } from 'react-router-dom'
import './ProductByCategory.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
function ProductByCategory() {
    const [products, setProducts] = useState([]);
    // console.log(products)
    const [error, setError] = useState('');
    const params = useParams()
    // console.log(params)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/api/products`);
                setProducts(response.data);
            } catch (err) {
                setError('Failed to fetch products', err);
            }
        };

        fetchProducts();

    }, []);

    return (
        <div>
            <h2 id="product-page-heading">{params.id}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="allproducts">
                {
                    products.map((item, i) => {
                        if (item.category == params.id) {
                            return (

                                <div className='item2' key={i}>
                                    <Link to={`/products/productinfo/${item._id}`}>
                                        <img src={item.image} alt="" />
                                        <p>{item.name}</p>

                                        <div className="item-prices">
                                            <div className="item-price-new">
                                                ${item.price}
                                            </div>

                                        </div>
                                    </Link>

                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default ProductByCategory
