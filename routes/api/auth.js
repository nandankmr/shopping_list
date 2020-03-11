const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const config = require("config");
const auth = require("../../middleware/auth");

// POST /auth/login
//@access public
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) res.status(400).json({ mes: "Enter all fields" });
  else
    User.findOne({ email })
      .then(user => {
        if (!user) res.status(400).json({ mes: "User does not exist" });
        else {
          bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) res.status(400).json({ mes: "Invalid credentials" });
            else {
              jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;

                  res.json({
                    token,
                    user: { name: user.name, email: user.email, id: user._id }
                  });
                }
              );
            }
          });
        }
      })
      .catch(err => console.log(err));
});

// POST /auth/user
// @access private
router.get("/user", auth, (req, res) => {
  User.findOne({ _id: req.user.id })
    .select("-password")
    .then(usr => {
      res.json(usr);
    });
});

module.exports = router;
