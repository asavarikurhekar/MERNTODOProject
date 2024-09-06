const mongoose = require("mongoose");

const conn = async (req, res) => {
    try {
        await mongoose.connect("mongodb+srv://user:fry2BLzWx1Uzul4E@cluster0.14slv.mongodb.net/")
    .then(()=>{
        console.log("connected");
    })
    } catch (error) {
        res.status(400).json({
            message:"not connected"
        });
    }
};
conn();
