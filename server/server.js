const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Routes
const blogRoutes = require('./routes/blogs');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/api/blogs', blogRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Admin Authentication Route
app.post('/api/validate-admin', (req, res) => {
    const { password } = req.body;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'classA2'; // Use environment variable for production

    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, message: 'Access Granted!' });
    } else {
        res.status(403).json({ success: false, message: 'Invalid Password!' });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
