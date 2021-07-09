const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    about: {
        type: String
    }
})

module.exports = mongoose.model("admin", (userSchema))