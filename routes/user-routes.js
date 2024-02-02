import { Router } from "express";
import {
    getAllUsers,
    reagisterUsers,
    loginUser,
    getUserVerify,
} from "../controllers/user-controllers.js";
import authenticateToken from "../midellwares/authenticateToken.js";

const userRouter = Router();

userRouter.get("/users/all", getAllUsers);
userRouter.post("/users", reagisterUsers);
userRouter.post("/users/login", loginUser);
userRouter.get("/user", authenticateToken, getUserVerify);

export default userRouter;
