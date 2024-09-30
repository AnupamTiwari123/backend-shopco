import { useEffect, useState } from 'react';

import axios from 'axios';

import './RelatedProducts.css'
import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
function RelatedProducts({ id }) {
    const [related, setRelated] = useState([])
    // console.log(id)
    let count = 0;
    useEffect(() => {
        axios.get(`${window.location.origin}/api/products`)
            .then(function (response) {

                // console.log(response);
                setRelated(response.data)
                // console.log(related)
            })
            .catch(function (error) {

                console.log(error);
            })
         
    }, [])
    return (
        <>
            <section className="related-products">
                <h2 id="related-products">Related Products</h2>



                <div className="related-items">
                    {
                        related.map((item, i) => {
                            if (count < 22) {

                                if (item.category == id) {

                                    return (

                                        <div className='item3' key={i} onClick={() => { window.scrollTo(0, 0) }}>
                                            <Link to={`/products/productinfo/${item._id}`}><img src={item.image} alt="" />
                                                <p>{item.name}</p>
                                                <p id="desc">{item.description}</p>
                                                <div className="item-prices">
                                                    <div className="item-price-new">
                                                        ${item.price}
                                                    </div>

                                                </div></Link>
                                        </div>
                                    )
                                }
                                count = count + 1
                            }
                        })
                    }
                </div>



            </section >

        </>
    )
}

export default RelatedProducts
