// have two functions
const userModel = require("../Schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async function (req, res) {
  try {
    let newUser = new userModel(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // max Round of hashing 12 to save time
    newUser.password = hashedPassword;

    let user = await newUser.save();
    res.json({ message: "User added successfully!", user: user });
  } catch (err) {
    res.status(400).json({ message: "Phone or Email aleardy Exist!!" });
  }
};

exports.login = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      user = await userModel.findOne({ phone: req.body.phone }); 
      if (!user) {
        return res.status(401).json({ message: "Invalid Information! ( Password or Email or Phone )"}); 
      }
    }
    let passwordCheck = await user.comparePassword(req.body.password);
    if (passwordCheck === false) {
      return res
        .status(401)
        .json({
          message: "Invalid Information! ( Password or Email or Phone ) pass",
        });
    }
    const token = jwt.sign({ _id: user._id, name: user.name, role: user.role }, "shhhh")
    return res.status(200).json({ message: "User Logged in", user: {name:user.name, email: user.email, token: token} });
  } catch (err) {
     res.status(400).json({message:"user is not logged in => " + err}) 
  }
};
