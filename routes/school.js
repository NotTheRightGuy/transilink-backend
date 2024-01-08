const { Router } = require("express");
const School = require("../Schema/School");
const router = Router();

router.get("/get", (req, res) => {
    let schoolName = req.query.schoolName;
    if (!schoolName)
        return res.status(400).json({ error: "School name not provided" });
    School.find({ school_name: { $regex: `^${schoolName}`, $options: "i" } })
        .then((schools) => {
            res.status(200).json(schools);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/getAll", (req, res) => {
    School.find({})
        .then((schools) => {
            res.status(200).json(schools);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.post("/add", (req, res) => {
    const schoolName = req.body.school_name;
    const schoolDisplayPicture = req.body.school_display_picture;
    const schoolAddress = req.body.school_address;

    if (!schoolName || !schoolDisplayPicture || !schoolAddress)
        return res.status(400).json({ error: "Missing fields" });

    const newSchool = new School({
        school_name: schoolName,
        school_display_picture: schoolDisplayPicture,
        school_address: schoolAddress,
    });

    newSchool
        .save()
        .then((school) => {
            res.status(200).json(school);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;
