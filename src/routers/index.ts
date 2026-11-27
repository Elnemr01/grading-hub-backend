import { Router } from "express";
import userRouter from "./v1/userRouter.ts";
import taskRouter from "./v1/taskRouterr.ts";

const router = Router();

router.use("/users", userRouter);
router.use("/tasks", taskRouter);

export default router;
