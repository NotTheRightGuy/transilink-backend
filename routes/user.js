const { Router } = require("express");

const jwt = require("jsonwebtoken");
const User = require("../Schema/User");
const { passEncryptor, comparePassword } = require("../utils/passwordHelper");

const JWT_SECRET = process.env.JWT_SECRET;

const router = Router();

router.post("/auth/register", (req, res) => {
    const username = req.body.username;
    let password = req.body.password;
    const fullName = req.body.full_name;
    const contactNumber = req.body.contact_number;
    const email = req.body.email;
    const address = req.body.address;
    const full_address = address.full_address;
    const longitude = address.longitude;
    const latitude = address.latitude;

    User.findOne({ username: username }).then((user) => {
        if (user) {
            return res
                .status(400)
                .json({ username: "Username already exists" });
        } else {
            password = passEncryptor(password);

            const newUser = new User({
                username: username,
                password: password,
                full_name: fullName,
                avatar: `https://api.dicebear.com/7.x/micah/svg?seed=${username}`,
                contact_number: contactNumber,
                email: email,
                address: {
                    full_address: full_address,
                    longitude: longitude,
                    latitude: latitude,
                },
            });

            newUser
                .save()
                .then((user) => {
                    const jwtToken = jwt.sign(
                        {
                            id: user._id,
                            username: user.username,
                            full_name: user.full_name,
                            avatar: user.avatar,
                            contact_number: user.contact_number,
                            email: user.email,
                            address: user.address,
                        },
                        JWT_SECRET,
                        {
                            expiresIn: "1d",
                        }
                    );
                    res.status(200).json({ JWT: jwtToken });
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        }
    });
});

router.post("/auth/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }).then((user) => {
        if (!user) {
            return res.status(404).json({ username: "User not found" });
        } else {
            const isPasswordCorrect = comparePassword(password, user.password);

            if (isPasswordCorrect) {
                const jwtToken = jwt.sign(
                    {
                        id: user._id,
                        username: user.username,
                        full_name: user.full_name,
                        avatar: user.avatar,
                        contact_number: user.contact_number,
                        email: user.email,
                        address: user.address,
                    },
                    JWT_SECRET,
                    {
                        expiresIn: "1d",
                    }
                );
                res.status(200).json({ ...user._doc, JWT: jwtToken });
            } else {
                return res.status(400).json({ password: "Wrong password" });
            }
        }
    });
});

module.exports = router;
