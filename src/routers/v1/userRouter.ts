import { Router } from "express";
import {
    userLogin,
    userLogout,
    userRegister,
} from "../../controllers/userController.ts";
import { validateToken } from "../../middlewares/validateToken.ts";

const userRouter = Router();

userRouter.route("/register").post(userRegister);
userRouter.route("/login").post(userLogin);
userRouter.route("/logout").post(validateToken, userLogout);

export default userRouter;