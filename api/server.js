const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
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

const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173';

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
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.get("/", (req, res) => {
    res.send("hello there");
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/newarrivals', newArrivals);
app.use('/api/payment', paymentRoutes);


app.use((req, res) => {
    res.status(404).send('404: Not Found');
});

module.exports = app;
