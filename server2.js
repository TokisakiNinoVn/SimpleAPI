const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Một danh sách mẫu các mục
let items = [
    {
        id: 1,
        name: 'Tokisaki Nino'
    },
    {
        id: 2,
        name: 'Hoshino Ai'
    },
    {
        id: 3,
        name: 'Hoang Ngoc Ma Thu'
    },
    // Add 17 more items with ids from 4 to 20
    {
        id: 4,
        name: 'Item 4'
    },
    {
        id: 5,
        name: 'Item 5'
    },
    {
        id: 6,
        name: 'Item 6'
    },
    {
        id: 7,
        name: 'Item 7'
    },
    {
        id: 8,
        name: 'Item 8'
    },
    {
        id: 9,
        name: 'Item 9'
    },
    {
        id: 10,
        name: 'Item 10'
    },
    {
        id: 11,
        name: 'Item 11'
    },
    {
        id: 12,
        name: 'Item 12'
    },
    {
        id: 13,
        name: 'Item 13'
    },
    {
        id: 14,
        name: 'Item 14'
    },
    {
        id: 15,
        name: 'Item 15'
    },
    {
        id: 16,
        name: 'Item 16'
    },
    {
        id: 17,
        name: 'Item 17'
    },
    {
        id: 18,
        name: 'Item 18'
    },
    {
        id: 19,
        name: 'Item 19'
    },
    {
        id: 20,
        name: 'Item 20'
    }
];

app.get('/', (req, res) => {
    res.send('Welcome to my simple API!');
});

// Route GET để lấy tất cả các mục
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Route GET để lấy một mục cụ thể theo id
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
});

// Route POST để tạo một mục mới
app.post('/api/items', (req, res) => {
    const newItem = req.body;
    newItem.id = items.length + 1;
    items.push(newItem);
    res.status(201).json(newItem);
});

// Route PUT để cập nhật một mục
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    let foundIndex = items.findIndex(item => item.id === id);
    if (foundIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    updatedItem.id = id;
    items[foundIndex] = updatedItem;
    res.json(updatedItem);
});

// Route DELETE để xóa một mục
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    items.splice(index, 1);
    res.status(204).send();
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`>> Click: http://localhost:${PORT}`);
});
