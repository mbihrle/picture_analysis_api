const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const app = express();

app.use(cors());
app.use(express.json());

const database = {
    users: [
        {
            id: "1",
            name: "Marco",
            email: "bihrle.marco@gmail.com",
            password: "1",
            entries: 0,
            joined: new Date(),
        },
        {
            id: "2",
            name: "Maren",
            email: "bihrle.maren@gmail.com",
            password: "1234",
            password: "2",
            entries: 0,
            joined: new Date(),
        },
    ],
    // logins: [
    //     {
    //         id: "88",
    //         hash: "",
    //         email: "bihrle.marco@gmail.com",
    //     },
    // ],
};

app.get("/", (req, res) => {
    res.json(database.users);
});

app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (
        email === database.users[0].email &&
        password === database.users[0].password
    ) {
        res.json(database.users[0]);
    } else {
        res.status(400).json("error logging in");
    }
});

app.post("/register", (req, res) => {
    const { email, name, password } = req.body;
    // Hash password
    // bcrypt.hash(password, saltRounds, function (err, hash) {
    //     console.log("myHash: ", hash);
    //     // Store hash in your password DB.
    // });
    database.users.push({
        id: "3",
        name,
        email,
        entries: 0,
        joined: new Date(),
    });
    res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let userFound = false;
    database.users.forEach((user) => {
        if (user.id === id) {
            userFound = true;
            return res.json(user);
        }
    });
    if (!userFound) {
        res.status(404).json("no such user");
    }
});

app.put("/image", (req, res) => {
    const { id } = req.body;
    let userFound = false;
    database.users.forEach((user) => {
        if (user.id === id) {
            userFound = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!userFound) {
        res.status(404).json("no such user");
    }
});

// // Hash password
// bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
//     // result == false
// });

app.listen(3000, () => {
    console.log("app is running on port 3000");
});
