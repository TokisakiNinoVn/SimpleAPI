
const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;
// const dataPath = '/f:/SimpleAPI/API/data.json';
const dataPath = 'data.json';

// Middleware to parse JSON data
app.use(express.json());

// GET method to retrieve all students
app.get('/', (req, res) => {
    res.send('Welcome to my simple API!');
});

app.get('/students', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const students = JSON.parse(data).students;
            res.json(students);
        }
    });
});

// POST method to add a new student
app.post('/students', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const students = JSON.parse(data).students;
            const newStudent = req.body;
            students.push(newStudent);
            const updatedData = JSON.stringify({ students });
            fs.writeFile(dataPath, updatedData, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(201).send('Student added successfully');
                }
            });
        }
    });
});

// PUT method to update a student
app.put('/students/:name', (req, res) => {
    const name = req.params.name;
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const students = JSON.parse(data).students;
            const updatedStudent = req.body;
            const index = students.findIndex(student => student.name === name);
            if (index !== -1) {
                students[index] = updatedStudent;
                const updatedData = JSON.stringify({ students });
                fs.writeFile(dataPath, updatedData, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.send('Student updated successfully');
                    }
                });
            } else {
                res.status(404).send('Student not found');
            }
        }
    });
});

// DELETE method to remove a student
app.delete('/students/:name', (req, res) => {
    const name = req.params.name;
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const students = JSON.parse(data).students;
            const index = students.findIndex(student => student.name === name);
            if (index !== -1) {
                students.splice(index, 1);
                const updatedData = JSON.stringify({ students });
                fs.writeFile(dataPath, updatedData, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.send('Student deleted successfully');
                    }
                });
            } else {
                res.status(404).send('Student not found');
            }
        }
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`>> Click: http://localhost:${PORT}`);
});



// const express = require('express');
// const app = express();
// const PORT = 3000;

// // Một route đơn giản
// app.get('/', (req, res) => {
//     res.send('Welcome to my simple API!');
// });

// // Route với tham số
// app.get('/api/greet/:name', (req, res) => {
//     const name = req.params.name;
//     res.json({ message: `Hello, ${name}!` });
// });

// // Khởi động server
// app.listen(PORT, () => {
//     console.log(`>> http://localhost:${PORT}`);
// });
