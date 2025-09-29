import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectDB();
});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch(err) {
        console.log("Failed to connect with Db", err);
    }
}


// app.post("/test", async (req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "x-goog-api-key": `${process.env.GEMINI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gemini-2.5-flash",
//             contents: [{
//                 role: "user",
//                 parts: [{
//                    text: message
//                 }]
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", options);
//         const data = await response.json();
//         //console.log(data.candidates[0].content.parts[0].text); //reply
//         res.send(data.candidates[0].content.parts[0].text);
//     } catch(err) {
//         console.log(err);
//     }
// });