require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 3000;
const profileRoutes = require('./routes/profileRoutes');

// Middleware
app.use(cors({
    origin: true, // Reflects the request origin
    credentials: true, // Allows sending cookies
}));

app.use(express.json());

// Session Configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: 'sessions',
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            sameSite: 'none', // or 'lax' depending on your setup
            secure: true, // true if using HTTPS
        },
    })
);


// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

// Routes
app.use('/profile', profileRoutes);

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
