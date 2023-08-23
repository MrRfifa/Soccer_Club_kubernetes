const router = require("express").Router();
const TrainingSession = require("../models/trainingSessionModel");
const User = require("../models/userModel");
const auth = require("../middlewares/Auth");
const { default: mongoose } = require("mongoose");

//Getting confirmed Sessions where Confirmed=true or coachUname!="none"
router.get("/getconfirmed", auth, async (req, res) => {
  try {
    coachuname = req.username;
    let currentDate = new Date().toISOString();
    const confirmedsessions = await TrainingSession.find({
      date: { $gte: currentDate },
      confirmed: true,
      coachUname: coachuname,
    });
    res.status(200).json(confirmedsessions);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Ooops! error can't get confirmed sessions" });
  }
});

//Getting done Sessions where date<date.now() and confirmed=true or coachUname!="none"
router.get("/getdone", auth, async (req, res) => {
  try {
    coachuname = req.username;
    let currentDate = new Date().toISOString();
    const donesessions = await TrainingSession.find({
      date: { $lte: currentDate },
      confirmed: true,
      coachUname: coachuname,
    });
    res.status(200).json(donesessions);
  } catch (error) {
    res.status(500).send({ error: "Ooops! error can't get done sessions" });
  }
});

//Confirm Training session
router.put("/confirm-session/:sessionId", auth, async (req, res) => {
  try {
    coachId = req.userId;
    const sessionId = mongoose.Types.ObjectId(req.params.sessionId);
    const { coachUname, confirmed } = req.body;
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
              coachUname: coachUname,
              confirmed: confirmed,
            },
          },
          { new: true }
        );
        User.updateOne(
          { _id: coachId },
          { $push: { options: sessionId } },
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          }
        );
        res.json({ message: "session confirmed successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Ooops! error can't confirm session" });
  }
});

module.exports = router;
