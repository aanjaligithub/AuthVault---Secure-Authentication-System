import express from "express"
import 'dotenv/config'
import connectDB from "./database/db.js"
import userRoute from "./routes/userRoute.js"
import cors from "cors"
import authRoute from "./routes/authRoute.js"
import "./config/passport.js"

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin: [
        process.env.CLIENT_URL,
        "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

console.log("CORS allowed origin:", process.env.CLIENT_URL)

app.use('/auth', authRoute)
app.use('/user', userRoute)

app.listen(PORT,()=> {
    connectDB()
    console.log(`Server is listening at PORT ${PORT}`);
    
})