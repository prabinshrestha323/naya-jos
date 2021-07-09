const express = require("express");
const router = express.Router()
const admin = require("../models/admin")
router
    .post("/login", async (req, res) => {
        const { email, password } = req.body;

        // check for missing filds
        if (!email || !password) {
            res.send("Please enter all the fields");
            return;
        }

        const doesUserExits = await User.findOne({ email });

        if (!doesUserExits) {
            res.send("invalid username or password");
            return;
        }

        const doesPasswordMatch = await bcrypt.compare(
            password,
            doesUserExits.password
        );

        if (!doesPasswordMatch) {
            res.send("invalid useranme or password");
            return;
        }

        // else he\s logged in
        req.session.user = {
            email,
        };

        res.redirect("/home");
    })












    //
    .post("/register", async (req, res) => {
        const { email, password } = req.body;

        // check for missing filds
        if (!email || !password) {
            res.send("Please enter all the fields");
            return;
        }

        const doesUserExitsAlreay = await User.findOne({ email });

        if (doesUserExitsAlreay) {
            res.send("A user with that email already exits please try another one!");
            return;
        }

        // lets hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        const latestUser = new User({ email, password: hashedPassword });

        latestUser
            .save()
            .then(() => {
                res.send("registered account!");
                return;
            })
            .catch((err) => console.log(err));
    });

module.exports = router