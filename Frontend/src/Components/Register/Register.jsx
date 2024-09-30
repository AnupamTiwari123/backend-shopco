
import { useState } from 'react';
import { registerUser } from '../../Services/apiServices';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, email, password });
            setSuccess('Registration successful. Please login.');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };


    return (
        <div className='registration'>
            <div className='register-form'>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div>
                        <label>Name:</label>
                        <p>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Enter your name' />
                            <i className="fa-regular fa-user"></i>
                        </p>
                    </div>
                    <div>
                        <label>Email:</label>
                        <p>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Enter you email' />
                            <i className="fa-solid fa-envelope"></i>
                        </p>
                    </div>
                    <div>
                        <label>Password:</label>
                        <p>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Enter your password' />
                            <i className="fa-solid fa-lock"></i></p>
                    </div>
                    <button type="submit">Register</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <p id='Al'>Already registered?<Link to={"/login"}>Login</Link></p>
            </div >
        </div >
    );
};

export default Register;
