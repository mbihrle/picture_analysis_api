const Clarifai = require("clarifai");

const clarifaiApp = new Clarifai.App({
    apiKey: "4060302e88684205ac4cf81edf5bad47",
});

const handleApiCall = (req, res) => {
    clarifaiApp.models
        .predict(Clarifai.GENERAL_MODEL, req.body.input)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db("users")
        .where("id", "=", id)
        .increment("entries", 1)
        .returning("entries")
        .then((entries) => {
            res.json(entries[0]);
        })
        .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
    handleImage,
    handleApiCall,
};
