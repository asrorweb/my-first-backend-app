import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/database.js";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", blogRouter);

connectToDatabase();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
