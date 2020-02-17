const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// POST /users/register
// @access public
router.post("/register/", (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password)
    res.json({ mes: "Enter all fields", status: 400 });
  else
    User.findOne({ email: email.trim() })
      .then(user => {
        if (user)
          res.status(400).json({ mes: "User already exists", status: 400 });
        else {
          const newUser = new User({ name, email: email.trim(), password });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then(data => {
                jwt.sign(
                  { id: data.id },
                  config.get("jwt_secret"),
                  { expiresIn: 3600 },
                  (err, token) => {
                    if (err) throw err;

                    res.json({
                      token,
                      user: {
                        name: data.name,
                        email: data.email,
                        id: data._id
                      }
                    });
                  }
                );
              });
            });
          });
        }
      })
      .catch(err => console.log(err));
});

module.exports = router;
