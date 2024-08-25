import express from "express";  // simple flexible and scalable NodeJs framework.
import bodyParser from "body-parser"; // express middleware which can parse an incoming http req into Json or other formats.
// in newer versions of express inbuilt parsing can be done.
import mongoose from "mongoose"; // this ODM makes handling database operations easier for us.
import cors from "cors"; // (middleware) CORS is a mechanism that allows a server to specify which origins are permitted to access its resources
import dotenv from "dotenv"; // this is used to keep certain variables hidden from github repo.
import 'dotenv/config';
import User from './model/Users.js';

const app = express(); // initialise the express modules as app

app.use(express.json()); // parses the http req into json format.

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("hii");
});

app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        console.log(newUser);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.post('/bfhl', async (req, res) => {
    const data = req.body.data;

    if (!Array.isArray(data)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
    const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
    const highestLowercaseAlphabet = alphabets.filter(item => item === item.toLowerCase() && item !== item.toUpperCase());

    const highestLowercase = highestLowercaseAlphabet.length ? [highestLowercaseAlphabet.sort()[highestLowercaseAlphabet.length - 1]] : [];

    const newUser = new User({
        is_success: true,
        user_id: 'mehul_agarwal_10102001',
        email: 'mehul.agarwal@gmail.com',
        roll_number: '21BEC0961',
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase
    });
    // console.log(newUser);
    res.status(201).json(newUser);
    // try {
    //     const savedUser = await newUser.save();
    //     res.status(201).json(savedUser);
    // } catch (error) {
    //     res.status(500).json({ error: 'Error saving user' });
    // }
});

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server running at ${process.env.PORT}.`))

    }).catch((error) => console.log(`${error} did not connect`))
