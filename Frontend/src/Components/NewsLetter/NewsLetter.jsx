import { useState } from 'react';
import './NewsLetter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="newsletter-container">
      <h2 className="newsletter-title">Subscribe to our Newsletter</h2>
      <form className="newsletter-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="newsletter-input"
        />
        <button type="submit" className="newsletter-btn">Subscribe</button>
      </form>
    </div>
  );
};

export default Newsletter;
