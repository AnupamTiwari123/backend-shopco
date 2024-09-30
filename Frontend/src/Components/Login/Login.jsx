import { useState } from 'react';
import { loginUser } from '../../Services/apiServices';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

// eslint-disable-next-line react/prop-types
const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { user } = await loginUser({ email, password });
            setUser(user); 

           

            navigate('/dashboard'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className='login-page'>
            <div className='login-form'>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className='form-group'>
                        <label htmlFor="email">Email:</label>
                        <p>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="inp1"
                                placeholder='Enter your email...'
                                required
                            />
                            <i className="fa-solid fa-envelope"></i>
                        </p>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password">Password:</label>
                        <p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="inp2"
                                placeholder="Enter your password..."
                                required
                            />
                            <i className="fa-solid fa-lock"></i>
                        </p>
                    </div>

                    <button type="submit" id="submit">Login</button>
                </form>
                
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                
                <p id="p1">
                    Don’t have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
