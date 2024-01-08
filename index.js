const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/user");
const schoolRouter = require("./routes/school");
const driverRouter = require("./routes/driver");
const logger = require("./middleware/logger");

const dbPassword = process.env.DBPASS;
const dbConnURL = `mongodb+srv://NotTheRightGuy:${dbPassword}@cluster0.gf1otxj.mongodb.net/?retryWrites=true&w=majority`;
const PORT = 8001;

app.use(express.json());
app.use(cors());
app.use(logger);

app.use("/user", userRouter);
app.use("/school", schoolRouter);
app.use("/driver", driverRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
    mongoose
        .connect(dbConnURL)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));
});
