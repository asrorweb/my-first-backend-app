import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectToDatabase from "./config/database.js";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api", userRouter);
app.use("/api", blogRouter);

connectToDatabase();

// Start the server
const port = process.env.PORT || 8008;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
export default app;
