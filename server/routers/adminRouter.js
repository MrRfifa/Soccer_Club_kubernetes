const router = require("express").Router();
const Kid = require("../models/kidModel");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const TrainingSession = require("../models/trainingSessionModel");
const Contact = require("../models/contactModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminauth = require("../middlewares/AdminAuth");
const { default: mongoose } = require("mongoose");
const fs = require("fs");

//adding an admin
router.post("/regadmin", async (req, res) => {
  try {
    const { username, password, passwordVerify } = req.body;
    //validation
    if (!username || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    } else if (password.length < 8) {
      return res.status(400).json({ error: "Password must be 8" });
    } else if (password !== passwordVerify) {
      return res.status(400).json({ error: "Please enter the same password" });
    }
    //finding if existing admin with the same username
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "An admin account with this username already exists" });
    }

    //hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //save a new user account to database
    const newAdmin = new Admin({
      username,
      passwordHash,
    });
    const savedAdmin = await newAdmin.save();

    //Creating the token
    const token = jwt.sign(
      {
        user: savedAdmin._id,
        userName: savedAdmin.username,
      },
      process.env.JWT_SECRET
    );
    //res.json({ password: passwordHash, token: token });
    //send the token in a http-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({ message: "Registred successfully!" });
  } catch (error) {
    //res.json(error);
    res.status(500).send();
  }
});

//loggin in the admin
router.post("/loginadmin", async (req, res) => {
  try {
    const { username, password } = req.body;
    //validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    }
    const existingAdmin = await Admin.findOne({ username });
    if (!existingAdmin) {
      return res.status(401).json({
        error: "Wrong username or password",
      });
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      existingAdmin.passwordHash
    );
    if (!passwordCorrect) {
      return res.status(401).json({
        error: "Wrong username or password",
      });
    }
    //Creating the token

    const token = jwt.sign(
      {
        user: existingAdmin._id,
        userName: existingAdmin.username,
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
      .send({ message: "logged in successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

//logout the admin
router.get("/logoutadmin", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send({ message: "logged out successfully" });
});

//verifying logged in admin or not
router.get("/loggedInadmin", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.send({
        loggedIn: false,
        username: "no one",
        //userid: "null",
      });
    } else {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      res.send({
        loggedIn: true,
        username: verified.userName,
        //userid: verified.user,
      });
    }
  } catch (error) {
    res.json({ error: "error" });
  }
});

//Getting all kids in db
router.get("/allkids", adminauth, async (req, res) => {
  try {
    const Kids = await Kid.find();
    res.status(200).json(Kids);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "error" });
  }
});

//getting all parents
router.get("/allparents", adminauth, async (req, res) => {
  try {
    const Parents = await User.find({ type: "Parent" });
    res.status(200).json(Parents);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "error" });
  }
});

//getting all members
router.get("/allmembers", adminauth, async (req, res) => {
  try {
    const members = await User.find({ type: "Member" });
    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "error" });
  }
});
//getting all coaches
router.get("/allcoaches", adminauth, async (req, res) => {
  try {
    const Coaches = await User.find({ type: "Coach" });
    res.status(200).json(Coaches);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "error" });
  }
});

//getting all admins
router.get("/alladmins", adminauth, async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).send({ error: "error" });
  }
});

//adding training session
router.post("/addsession", adminauth, async (req, res) => {
  try {
    const { date, coachUname, confirmed } = req.body;
    adminUname = req.username;
    if (!date) {
      return res.status(400).json({ error: "Please enter date" });
    }
    const newSession = new TrainingSession({
      date,
      adminUname,
      coachUname,
      confirmed,
    });
    await newSession.save();
    res.status(200).json({ message: "Session added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "error" });
  }
});

//Getting Pending Sessions where Confirmed=false or coachUname="none" and date>date.now()
router.get("/getpending", adminauth, async (req, res) => {
  try {
    let currentDate = new Date().toISOString();
    const pendingsessions = await TrainingSession.find({
      confirmed: false,
      coachUname: "none",
      date: { $gte: currentDate },
    });
    res.status(200).json(pendingsessions);
  } catch (error) {
    res.status(500).send({ error: "Ooops! error can't get pending sessions" });
  }
});
//Getting confirmed Sessions where Confirmed=true or coachUname!="none"
router.get("/getconfirmed", adminauth, async (req, res) => {
  try {
    let currentDate = new Date().toISOString();
    const confirmedsessions = await TrainingSession.find({
      date: { $gte: currentDate },
      confirmed: true,
      coachUname: { $ne: "none" },
    });
    res.status(200).json(confirmedsessions);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Ooops! error can't get confirmed sessions" });
  }
});
//Getting canceled Sessions where date<date.now()
router.get("/getcanceled", adminauth, async (req, res) => {
  try {
    let currentDate = new Date().toISOString();
    const canceledsessions = await TrainingSession.find({
      date: { $lte: currentDate },
      coachUname: "none",
    });
    res.status(200).json(canceledsessions);
  } catch (error) {
    res.status(500).send({ error: "Ooops! error can't get canceled sessions" });
  }
});

//Getting done Sessions where date<date.now() and confirmed=true or coachUname!="none"
router.get("/getdone", adminauth, async (req, res) => {
  try {
    let currentDate = new Date().toISOString();
    const donesessions = await TrainingSession.find({
      date: { $lte: currentDate },
      confirmed: true,
      coachUname: { $ne: "none" },
    });
    res.status(200).json(donesessions);
  } catch (error) {
    res.status(500).send({ error: "Ooops! error can't get done sessions" });
  }
});
//get Session by id
router.get("/get-session/:id", adminauth, async (req, res) => {
  try {
    const Sessioninfo = await TrainingSession.findById(
      mongoose.Types.ObjectId(req.params.id)
    );
    res.status(200).json(Sessioninfo);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Ooops! error can't get this specific kid" });
  }
});
//Updating Training session
router.put("/edit-session/:sessionId", adminauth, async (req, res) => {
  try {
    const sessionId = mongoose.Types.ObjectId(req.params.sessionId);
    const { date } = req.body;
    TrainingSession.findById(sessionId, async function (err, docs) {
      if (err) {
        res
          .status(500)
          .send({ error: "Ooops! error can't get the session ID" });
      } else {
        await TrainingSession.findOneAndUpdate(
          { _id: sessionId },
          {
            $set: {
              date: date,
            },
          },
          { new: true }
        );
        res.json({ message: "session updated successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Ooops! error can't update sessions" });
  }
});

//Deleting confirmed Training session
router.delete("/delete-session/:sessionId", adminauth, async (req, res) => {
  try {
    const sessionId = mongoose.Types.ObjectId(req.params.sessionId);
    const coachdoc = await User.find({ options: sessionId });
    const coachusername = coachdoc[0].username;
    TrainingSession.findById(sessionId, async function (err, docs) {
      if (err) {
        res
          .status(500)
          .send({ error: "Ooops! error can't get the session ID" });
      } else {
        await User.updateOne(
          { username: coachusername },
          {
            $pullAll: {
              options: [{ _id: sessionId }],
            },
          }
        );
        await TrainingSession.deleteOne({ _id: sessionId });
        res.json({ message: "session deleted successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Ooops! error can't  delete session" });
  }
});

//Deleting confirmed Training session
router.delete(
  "/delete-non-confirmed/:sessionId",
  adminauth,
  async (req, res) => {
    try {
      const sessionId = mongoose.Types.ObjectId(req.params.sessionId);
      TrainingSession.findById(sessionId, async function (err, docs) {
        if (err) {
          res
            .status(500)
            .send({ error: "Ooops! error can't get the session ID" });
        } else {
          await TrainingSession.deleteOne({ _id: sessionId });
          res.json({ message: "session deleted successfully" });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Ooops! error can't  delete session" });
    }
  }
);

//delete a kid
router.delete("/delete/:kidId", adminauth, async (req, res) => {
  try {
    const kidId = mongoose.Types.ObjectId(req.params.kidId);
    Kid.findById(kidId, async function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        fs.unlinkSync(`images/${docs.image}`);
        await Kid.deleteOne({ _id: kidId });
        await User.updateOne(
          { username: docs.parentUname },
          {
            $pullAll: {
              options: [{ _id: kidId }],
            },
          }
        );
        console.log();
        res.json({ message: "deleted successfully" });
      }
    });
  } catch (error) {
    res.send({ message: " Ooops! error in deleting the kid" });
  }
});

//update a kid
router.put("/update/:kidId", adminauth, async (req, res) => {
  try {
    const kidId = mongoose.Types.ObjectId(req.params.kidId);
    const { firstName, lastName, dateOfBirth } = req.body;

    Kid.findById(kidId, async function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        // existing kid with the same data
        const existingKid = await Kid.findOne({
          lastName: lastName,
          firstName: firstName,
        });
        console.log(existingKid);
        if (existingKid) {
          return res
            .status(400)
            .json({ error: "A kid with those information already exists" });
        }
        // existing kid with the same data
        const updatedkid = await Kid.findOneAndUpdate(
          { _id: kidId },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              dateOfBirth: dateOfBirth,
            },
          },
          { new: true }
        );
        res.json({ message: "updated successfully" });
      }
    });
  } catch (error) {
    res.send({ message: "Ooops! error in updating the kid" });
    console.log(error);
  }
});

//get Kid by id
router.get("/getkid/:id", adminauth, async (req, res) => {
  try {
    const Kidinfo = await Kid.findById(mongoose.Types.ObjectId(req.params.id));
    res.status(200).json(Kidinfo);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Ooops! error can't get this specific kid" });
  }
});

//get not logged in users messages
router.get("/anonymous", adminauth, async (req, res) => {
  try {
    const anonymousmessages = await Contact.find({ isAnonymous: true });
    res.status(200).json(anonymousmessages);
  } catch (error) {
    res.status(500).send({ error: "Ooops! Can't get messages" });
  }
});
//get logged in users messages
router.get("/identified", adminauth, async (req, res) => {
  try {
    const identifiedmessages = await Contact.find({ isAnonymous: false });
    res.status(200).json(identifiedmessages);
  } catch (error) {
    res.status(500).send({ error: "Ooops! Can't get messages" });
  }
});

module.exports = router;
