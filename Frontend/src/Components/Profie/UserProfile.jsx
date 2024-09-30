import { useState, useEffect } from 'react';
import { getUserDetails, updateUserDetails } from '../../Services/apiServices';
import './UserProfile.css';

const UserProfile = () => {
    const [userData, setUserData] = useState({
        name: '',
        contact: '',
        addresses: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserDetails();
                setUserData({
                    name: data.name || '',
                    contact: data.contact || '',
                    addresses: Array.isArray(data.addresses) ? data.addresses : [],
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user details.', err);
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'addresses') {

            const addressesArray = value ? value.split('\n') : [];
            setUserData((prevData) => ({ ...prevData, [name]: addressesArray }));
        } else {
            setUserData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserDetails(userData);
            setUserData(updatedUser);
            alert('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile.', err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit} className="profile-form">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name || ''}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="contact">Contact</label>
                <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={userData.contact || ''}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="addresses">Addresses</label>
                <textarea
                    id="addresses"
                    name="addresses"
                    value={userData.addresses.join('\n') || ''}
                    onChange={handleChange}
                    rows="4"
                    required
                />

                <button type="submit" className="update-btn">Update Profile</button>
            </form>
        </div>
    );
};

export default UserProfile;
