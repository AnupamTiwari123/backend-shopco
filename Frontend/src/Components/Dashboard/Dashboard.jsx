import { useEffect, useState } from 'react';

import Wishlist from '../Wishlist/Wishlist';
import './Dashboard.css';
import Cart from '../Cart/Cart';
import { useUser } from '../UserContext/UserContext';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${window.location.origin}/api/users/me`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                // console.log(data,response)x
                if (response.ok) {
                    setUser(data);
                } else {
                    setUser(null);
                }
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setUser(null);
            }
        };

        fetchUser();
     
    }, []);
// console.log(user)



const { logout } = useUser();

const handleLogout = async () => {
    try {

        const response = await fetch(`${window.location.origin}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include', 
        });

        if (response.ok) {
          
            logout(); 
        } else {
            const { message } = await response.json();
            alert(`Failed to log out: ${message}`);
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert('An error occurred during logout. Please try again.');
    }
};


    return (
        <>
            <div className="profile-container">
                <div className="welcome-message">
                    <h1>Welcome, {user ? user.name : 'Guest'}!</h1>
                    {user ? (
                        <p>Manage your wishlist, orders, and cart below.</p>
                    ) : (
                        <p>Login to Manage your wishlist, orders, and cart.</p>
                    )}
                </div>
                {user && (
                    <button className="logout-btn" onClick={handleLogout}>
                        Sign out
                    </button>
                )}
            </div>

            <div className="dashboard-buttons">
                {user && (
                    <>
                        <Link to="/userprofile">
                            <button className="dashboard-btn profile-btn">Update Profile</button>
                        </Link>

                        <Link to={`/orders/${user._id}`}>
                            <button className="dashboard-btn order-btn">Order Details</button>
                        </Link>
                    </>
                )}
            </div>

            {user && (
                <div className="dashboard-content">
                    <Wishlist user={user} />
                </div>
            )}
            {user && (
                <div className="cart-hidden">
                    <Cart user={user} />
                </div>
            )}
        </>
    );
}

export default Dashboard;
