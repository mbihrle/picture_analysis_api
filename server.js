const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "bihrl",
        password: "bihrl",
        database: "picture_analysis",
    },
});

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//     res.json(database.users);
// });

app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt, saltRounds));
app.get("/profile/:id", profile.handleProfileGet(db));
app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleApiCall);

app.listen(3000, () => {
    console.log("app is running on port 3000");
});
