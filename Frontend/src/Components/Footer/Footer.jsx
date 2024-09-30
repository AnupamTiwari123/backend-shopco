
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 style={{ fontSize: "24pt" }}>Shop.co</h3>
                    <p>Your one-stop shop for everything!</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <Link to="\about"><li>About Us</li></Link>
                        <Link to="\contact"><li>Contact Us</li></Link>
                        <Link to="\faq"><li>FAQ</li></Link>
                        <Link to="\terms"><li>Terms of Service</li></Link>
                        <Link to="\privacy"><li>Privacy Policy</li></Link>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>Email: support@shop.co</p>
                    <p>Phone: (123) xxxxxx</p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-media">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Shop.co. All Rights Reserved.</p>
            </div>
        </footer >
    );
};

export default Footer;
