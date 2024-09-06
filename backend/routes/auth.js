const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//Sign in

router.post("/register", async(req, res) =>{
    try {
        const {email, username, password} = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({email, username, password:hashpassword});
        await user.save()
        .then(() => res.status(200).json({message: "Registered successfully!"}));
      
    } catch (error) {
        console.log(error);
        res.status(200).json({message: "user already exists"});
    }
} );

//login
router.post("/login", async(req, res) =>{
    try {
        const user = await User.findOne({ email:req.body.email });
        if (!user) {
            return res.status(200).json({message: "User not found, Sign up first"});
        }
        const matchedPassword = bcrypt.compareSync(req.body.password,user.password)
        if (!matchedPassword) {
            return res.status(200).json({message: "Invalid password credentials!"});
        }

        //excluding password get everything
        const {password,...others}=user._doc;
        res.status(200).json({others});
    } catch (error) {
        console.log(error);
        res.status(200).json({message: "user already exists"});
    }
} );



module.exports = router;

