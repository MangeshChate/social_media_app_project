const express = require('express');
const app = express();
const cors=require("cors");
const multer = require("multer")
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const PORT = 8800;
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const path = require("path")
// const bodyParser = require('body-parser'); 

// MONGO_URL = mongodb+srv://mangesh:QYTLPQdNOFoTwxuz@cluster0.6hhshhc.mongodb.net/social_media_db?retryWrites=true&w=majority
dotenv.config();
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))




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
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(morgan("common"));



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // Use the original name of the uploaded file and append something to it
    const uniqueFilename = `${file.originalname}`;
    cb(null, uniqueFilename);
  },
});


app.use("/images",express.static(path.join(__dirname ,"public/images")))

const upload = multer({storage});
app.post("/api/upload" ,upload.single("file") ,(req,res)=>{
  try {
    return res.status(200).json("File is uploaded Successfully !")
  } catch (error) {
    console.log(error)
  }
})



app.use("/api/users" ,userRoute);
app.use("/api/auth" ,authRoute);
app.use("/api/posts" ,postRoute);
app.use("/api/conversations" ,conRoute);
app.use("/api/messages" ,messageRoute);




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