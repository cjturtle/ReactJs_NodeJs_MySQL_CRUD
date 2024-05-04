require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const sqlRoutes = require("./routes/routes");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(sqlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
