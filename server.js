const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

const database = require("./controllers/database");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = database.getDatabase(process.env.NODE_ENV);
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("it is working");
});
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt, saltRounds));
app.get("/profile/:id", profile.handleProfileGet(db));
app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleApiCall);

const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on port ${port}`));
