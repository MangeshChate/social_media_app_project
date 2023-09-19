const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const PORT = 8800;
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
dotenv.config();

//MONGO DB connection
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();



//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users" ,userRoute);
app.use("/api/auth" ,authRoute);
app.use("/api/posts" ,postRoute);


//appliction
app.get("/" ,(req,res)=>{
    res.send("Welcome to homepage");
});
app.get("/users" ,(req,res)=>{
    res.send("Welcome to user");
});


app.listen(PORT , ()=>{
    console.log(`Backend server is running on post ${PORT}`);
})