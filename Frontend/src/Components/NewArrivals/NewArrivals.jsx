
import { useEffect, useState } from 'react'
import './NewArrivals.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import newarrivals from '../../Frontend_Assets/new_arrivals'

function NewArrivals() {
    const [newarrivals, setNewArrivals] = useState([])
    useEffect(() => {
        axios.get(`${window.location.origin}/api/newarrivals`)
            .then(function (response) {

                // console.log(response);
                setNewArrivals(response.data)
                // console.log(newarrivals)
            })
            .catch(function (error) {

                console.log(error);
            })
         
    }, [])
    return (
        <>
            <section className="new-arrival">
                <div className="new-head">
                    <h1>New Arrivals</h1>
                    <hr />
                </div>
                <div className="items">

                    <div className="newitems">
                        {
                            newarrivals.map((item, i) => {
                                return (

                                    <div className='item' key={i}>
                                        <Link to={`/products/productinfo/${item._id}`}>

                                            <img src={item.image} alt="" />
                                            <p>{item.name}</p>
                                            <p id="desc">{item.description}</p>
                                            <div className="item-prices">
                                                <div className="item-price-new">
                                                    ${item.newPrice}
                                                </div>
                                                <div className="item-price-old">
                                                    ${item.oldPrice}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </section>
        </>
    )
}

export default NewArrivals
