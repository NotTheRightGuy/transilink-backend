const bcrypt = require("bcrypt");

// Write a function to take password and return a hashed password

const passEncryptor = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = { passEncryptor, comparePassword };
