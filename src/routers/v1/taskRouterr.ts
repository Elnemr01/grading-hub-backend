import { Router } from "express";
import { createTask, deleteTask, editTask, getAllTasks, getTaskById } from "../../controllers/taskControllers.ts";
import { validateDoctorRole } from "../../middlewares/validateDoctorRole.ts";
import { validateToken } from "../../middlewares/validateToken.ts";



const taskRouter = Router();

taskRouter.route("/add").post(validateToken,validateDoctorRole,createTask);
taskRouter.route("/edit/:id").post(validateToken,validateDoctorRole,editTask);
taskRouter.route("/:id").delete(validateToken,validateDoctorRole,deleteTask);

taskRouter.route("/all").get(validateToken,getAllTasks);
taskRouter.route("/:id").get(validateToken,getTaskById);





export default taskRouter;