const express = require("express");
const router = express.Router()
const About = require("../models/about")
router.post("/", (req, res) => {
    const about = new About({
        about: req.body.about

    })
    about.save()
        .then(about => {
            res.status(200).json({
                about: about
            })
        })
})

module.exports = router