import { Router } from "express";
import { userLogin, userLogout, userRegister } from "../controllers/userController.ts";

const userRouter= Router();

userRouter.route('/register').post(userRegister);
userRouter.route('/login').post(userLogin);
userRouter.route('/logout').get(userLogout);


export default userRouter;