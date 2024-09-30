import { useEffect, useState } from 'react';
import './NewCollection.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewCollection() {
    const [newCollection, setNewCollection] = useState([]);

    useEffect(() => {
        axios.get(`${window.location.origin}/api/newarrivals`)
            .then((response) => {
                setNewCollection(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <section id="new-arrival-section">
            <div className="new-head">
                <h1>New Arrivals</h1>
                <hr />
            </div>

            <div className="newitems-container">
                {newCollection.slice(0, 4).map((item, i) => (
                    <div className="item-card" key={i}>
                        <Link to={`/products/productinfo/${item._id}`}>
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <p className="item-name">{item.name}</p>
                                <p className="item-description">{item.description}</p>
                                <div className="item-prices">
                                    <span className="item-price-new">${item.newPrice}</span>
                                    <span className="item-price-old">${item.oldPrice}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="view-all-container">
                <Link to="/newarrivals">
                    <button className="view-all-button">View All</button>
                </Link>
            </div>
        </section>
    );
}

export default NewCollection;
