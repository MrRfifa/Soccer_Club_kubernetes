const router = require("express").Router();
const TrainingSession = require("../models/trainingSessionModel");
const User = require("../models/userModel");
const auth = require("../middlewares/Auth");
const { default: mongoose } = require("mongoose");

//get all confirmed sessions
router.get("/getconfirmed", auth, async (req, res) => {
  try {
    let currentDate = new Date().toISOString();
    memberId = req.userId;
    User.findById(memberId, async function (err, docs) {
      if (err) {
        res.status(500).send({ error: "Ooops! error can't get the member ID" });
      } else {
        const confirmedsessions = await TrainingSession.find({
          date: { $gte: currentDate },
          confirmed: true,
          coachUname: { $ne: "none" },
          _id: { $nin: docs.options },
        });
        res.status(200).json(confirmedsessions);
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Ooops! error can't get confirmed sessions" });
  }
});

//confirm participation
router.put("/participate/:sessionId", auth, async (req, res) => {
  try {
    memberId = req.userId;
    const sessionId = mongoose.Types.ObjectId(req.params.sessionId);
    TrainingSession.findById(sessionId, async function (err, docs) {
      if (err) {
        res
          .status(500)
          .send({ error: "Ooops! error can't get the session ID" });
      } else {
        User.updateOne(
          { _id: memberId },
          { $push: { options: sessionId } },
          function (err, result) {
            if (err) {
              //console.log(err);
            } else {
              //console.log(result);
            }
          }
        );
        res.json({
          message: "your pre-subscription is confirmed successfully",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Ooops! error can't confirm session" });
  }
});

//get participated sessions
router.get("/participated", auth, (req, res) => {
  try {
    memberId = req.userId;
    User.findById(memberId, async function (err, docs) {
      if (err) {
        res.status(500).send({ error: "Ooops! error can't get the member ID" });
      } else {
        const participatedsessions = await TrainingSession.find({
          _id: docs.options,
        });
        res.status(200).json(participatedsessions);
      }
    });
  } catch (error) {}
});

//cancel participation
router.put("/cancel/:sessionId", auth, async (req, res) => {
  try {
    //memberId = req.userId;
    const sessionId = mongoose.Types.ObjectId(req.params.sessionId);
    await User.updateOne(
      { username: req.username },
      {
        $pullAll: {
          options: [{ _id: sessionId }],
        },
      }
    );
    res.status(200).send({ message: "Participation canceled successfully" });
  } catch (error) {
    //console.log(error);
    res.status(500).send({ error: "Ooops! error can't cancel session" });
  }
});

module.exports = router;
