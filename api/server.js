const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");

const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
dotenv.config();

const authRoutes = require('../routes/authRoutes.routes');
const userRoutes = require('../routes/userRoutes.routes');
const productRoutes = require('../routes/productRoutes.routes');
const wishlistRoutes = require('../routes/wishListRoutes.routes');
const cartRoutes = require('../routes/cartRoutes.routes');
const orderRoutes = require('../routes/orderRoutes.routes');
const reviewRoutes = require('../routes/reviewRoutes.routes');
const newArrivals = require('../routes/newArrivals.routes');
const paymentRoutes = require('../routes/paymentRoutes.routes');

const app = express();
const allowedOrigins = process.env.FRONTEND_URL ||'http://localhost:5173'; 

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/newarrivals', newArrivals);
app.use('/api/payment', paymentRoutes);
app.get("/", (req, res) => {
res.send("hello there")
    });
    app.use((req, res) => {
        console.log(`Route not found: ${req.method} ${req.originalUrl}`);
        res.status(404).send('404: Not Found');
    });
    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});