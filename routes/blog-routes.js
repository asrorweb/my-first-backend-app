import { Router } from "express";
import {
    createBlogs,
    deleteBlogs,
    getAllBlogs,
    updateBlogs,
} from "../controllers/blog-controller.js";
import authenticateToken from "../midellwares/authenticateToken.js";

const blogRouter = Router();

blogRouter.get("/blogs/all", getAllBlogs);
blogRouter.post("/blogs", authenticateToken, createBlogs);
blogRouter.put("/blogs/update/:id", authenticateToken, updateBlogs);
blogRouter.delete("/blogs/delete/:id", authenticateToken, deleteBlogs);

export default blogRouter;
