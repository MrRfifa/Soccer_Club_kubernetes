const router = require("express").Router();
const User = require("../models/userModel");
const Kid = require("../models/kidModel");
const Contact = require("../models/contactModel");
const TrainingSession = require("../models/trainingSessionModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/Auth");

//register
router.post("/reg", async (req, res) => {
  try {
    const { lastName, firstName, username, password, passwordVerify, type } =
      req.body;

    //validation
    if (!username || !password || !passwordVerify || !lastName || !firstName) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    } else if (password.length < 8) {
      return res.status(400).json({ error: "Password must be 8" });
    } else if (password !== passwordVerify) {
      return res.status(400).json({ error: "Please enter the same password" });
    }
    //finding if existing user with the same username
    const lcusername = username.toLowerCase();
    const lclastName = lastName.toLowerCase();
    const lcfirstName = firstName.toLowerCase();
    const existingUser = await User.findOne({
      $or: [
        { username: lcusername },
        { $and: [{ lastName: lclastName }, { firstName: lcfirstName }] },
      ],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "An account with those informations already exists" });
    }

    //hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //save a new user account to database

    const newUser = new User({
      username: lcusername,
      lastName: lclastName,
      firstName: lcfirstName,
      passwordHash,
      type,
    });
    const savedUser = await newUser.save();

    //Creating the token
    const token = jwt.sign(
      {
        user: savedUser._id,
        userType: savedUser.type,
        userName: savedUser.username,
        lastName: savedUser.lastName,
        firstName: savedUser.firstName,
      },
      process.env.JWT_SECRET
    );
    //send the token in a http-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({ message: "Registred successfully!" });
  } catch (error) {
    res.json(error);
    res.status(500).send({ error: "error in registring" });
  }
});

//log in
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    //validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    }
    const lcusername = username.toLowerCase();
    const existingUser = await User.findOne({ username: lcusername });
    if (!existingUser) {
      return res.status(401).json({
        error: "Wrong username or password",
      });
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      return res.status(401).json({
        error: "Wrong username or password",
      });
    }
    //Creating the token

    const token = jwt.sign(
      {
        user: existingUser._id,
        userType: existingUser.type,
        userName: existingUser.username,
        lastName: existingUser.lastName,
        firstName: existingUser.firstName,
      },
      process.env.JWT_SECRET
    );
    //send the token in a http-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({ message: "Logged in successfully!" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send({ message: "logged out successfully" });
});
//verifying logged in or not
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.send({
        loggedIn: false,
        type: "nothing",
        username: "no one",
        userid: "null",
      });
    } else {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      res.send({
        loggedIn: true,
        type: verified.userType,
        username: verified.userName,
        userid: verified.user,
        lastName: verified.lastName,
        firstName: verified.firstName,
      });
    }
  } catch (error) {
    res.json(false);
  }
});

//change password
router.put("/changepassword", auth, async (req, res) => {
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;

  const user = await User.findOne({ username: req.username });
  if (!oldPassword || !newPassword || !newPasswordConfirm) {
    return res.status(400).json({ error: "Please enter all required fields" });
  } else if (newPassword.length < 8) {
    return res.status(400).json({ error: "Password must be 8" });
  } else if (newPassword !== newPasswordConfirm) {
    return res.status(400).json({ error: "Please enter the same password" });
  }
  const passwordCorrect = await bcrypt.compare(oldPassword, user.passwordHash);

  if (!passwordCorrect) {
    return res.status(401).json({
      error: "Wrong Password entered",
    });
  } else {
    const salt = await bcrypt.genSalt();
    const newPasswordHash = await bcrypt.hash(newPassword, salt);
    User.findOneAndUpdate(
      {
        username: req.username,
      },
      { $set: { passwordHash: newPasswordHash } },
      {
        returnNewDocument: true,
      }
    ).then(
      (data) => {
        //console.log("Data", data);
      },
      (err) => {
        //console.log("Error Update", err);
      }
    );
    return res.json({ message: "Password updated successfully" });
  }
});

//change username
router.put("/changeusername", auth, async (req, res) => {
  const { newUsername, password } = req.body;

  const user = await User.findOne({ username: req.username });
  if (!newUsername || !password) {
    return res.status(400).json({ error: "Please enter all required fields" });
  } else if (password.length < 8) {
    return res.status(400).json({ error: "Password must be 8" });
  }
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  //existing user with same new username
  const existingUser = await User.findOne({ newUsername });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "An account with this username already exists" });
  }

  if (!passwordCorrect) {
    return res.status(401).json({
      error: "Wrong Password entered",
    });
  } else {
    User.findOneAndUpdate(
      {
        _id: user._id,
      },
      { $set: { username: newUsername } },
      {
        returnNewDocument: true,
      }
    ).then(
      (data) => {
        // console.log("Data", data);
      },
      (err) => {
        // console.log("Error Update", err);
      }
    );
    Kid.updateMany(
      {
        parentId: user._id,
      },
      { $set: { parentUname: newUsername } },
      {
        returnNewDocument: true,
      }
    ).then(
      (data) => {
        // console.log("Data", data);
      },
      (err) => {
        // console.log("Error Update", err);
      }
    );
    return res.json({ message: "Username updated successfully" });
  }
});

//contacting admins anonymously
router.post("/contactanonym", async (req, res) => {
  try {
    const { identifier, subject, description } = req.body;
    if (!identifier || !subject || !description) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    }
    const newMessage = new Contact({
      identifier,
      subject,
      description,
      isAnonymous: true,
    });
    await newMessage.save();
    res.send({ message: "Your message submitted successfully!" });
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Stack Trace:", error.stack);
    res.status(400).send({ error: "Ooops! an error occurred" });
  }
});

//contacting admins when logged in
router.post("/contactus", auth, async (req, res) => {
  try {
    const { subject, description } = req.body;
    identifier = req.username;
    if (!subject || !description) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    }
    const newMessage = new Contact({
      identifier,
      subject,
      description,
      isAnonymous: false,
    });
    await newMessage.save();
    res.send({ message: "Your message submitted successfully!" });
  } catch (error) {
    res.status(400).send({ error: "Ooops! an error occured" });
  }
});

router.delete("/deleteaccount", auth, async (req, res) => {
  try {
    const { password } = req.body;
    userType = req.userType;
    if (!password) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    } else if (password.length < 8) {
      return res.status(400).json({ error: "Password must be 8" });
    }
    const user = await User.findOne({ username: req.username });
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json({
        error: "Wrong Password entered",
      });
    } else {
      if (userType === "Parent") {
        await User.deleteOne({ _id: user._id });
        await Kid.deleteMany({ _id: { $in: user.options } });
      } else if (userType === "Member") {
        await User.deleteOne({ _id: user._id });
      } else if (userType === "Coach") {
        await User.deleteOne({ _id: user._id });
        await TrainingSession.updateMany(
          {
            _id: { $in: user.options },
          },
          { $set: { coachUname: "none", confirmed: false } },
          {
            returnNewDocument: true,
          }
        ).then(
          (data) => {
            // console.log("Data", data);
          },
          (err) => {
            // console.log("Error Update", err);
          }
        );
      }
      // Clear the cookie associated with the user's session
      res.clearCookie("token");
      res.json({ message: "account deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
});

module.exports = router;
