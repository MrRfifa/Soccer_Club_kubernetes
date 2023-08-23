const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// Set up server
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    credentials: true,
  })
);

// Connect to MongoDB
const mdbConnect = process.env.MDB_CONNECT;
mongoose.connect(
  mdbConnect,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.error("Error connecting to MongoDB:", err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

// Set up routes
// Admin route
app.use("/admin", require("./routers/adminRouter"));
app.use("/coach", require("./routers/coachRouter"));
app.use("/member", require("./routers/memberRouter"));
app.use("/auth", require("./routers/userRouter"));
app.use("/kid", require("./routers/kidRouter"));
