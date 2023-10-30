const router = require('express').Router();
const User = require("../models/User")
const bcrypt = require('bcrypt')


//Register
router.post("/register", async (req, res) => {
    //genrated new password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    try {
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword
        });

        //save user and returen response
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
});


//Login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).json("Wrong password");
      }
  
      res.status(200).json(user);
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

module.exports = router;