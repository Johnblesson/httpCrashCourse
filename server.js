const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const TOKEN = process.env.TOKEN;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// app.get('/', (req, res) => {
//     // res.json({ msg: 'Hello from Express' })
//     res.send(req.rawHeaders)
// })

app.post('/contact', (req, res) => {
    res.send(req.body);
})

app.post('/login', (req, res) => {
    if(!req.header('x-auth-token')) {
        return res.status(400).send('No Token')
    }

    if (req.header('x-auth-token') !== TOKEN) {
        return res.status(401).send('Not authorized');
    }

    res.send('Logged in')
})

app.listen(PORT, (error) => {
    if (error) {
        console.log('Something went wrong')
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})