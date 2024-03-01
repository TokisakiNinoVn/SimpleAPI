const express = require('express');
const app = express();
const PORT = 3000;

// Một route đơn giản
app.get('/', (req, res) => {
    res.send('Welcome to my simple API!');
});

// Route với tham số
app.get('/api/greet/:name', (req, res) => {
    const name = req.params.name;
    res.json({ message: `Hello, ${name}!` });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`>> http://localhost:${PORT}`);
});
