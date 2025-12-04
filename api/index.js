import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/user.route.js';
import cors from 'cors';
import authRouter from './routes/auth.route.js';

const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/mern-estate").then(()=>{
    console.log ('Connected to MongoDB!');
}).catch((err)=>{
    console.log(err)
});



app.listen(3000,()=>{
    console.log ('server is running on port 3000');
});


app.use("/api/user", userRouter)
app.use("/api/auth", authRouter);


//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ 
        success: false,
        statusCode,
        message,
     });
});

