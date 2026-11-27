import Task from "../models/TaskSchema.ts";
import createResponse from "../utlis/createResponse.ts";
import ErrorHandler from "../utlis/errorHandler.ts";
import type { Request, Response, NextFunction } from 'express';
import { ErrorStatus } from "../utlis/errorStatus.ts";
import User from "../models/UserSchema.ts";
import type { JwtPayload } from "jsonwebtoken";



// admin create task

export const createTask = ErrorHandler(async (req: Request, res: Response) => {

    const { title, description, deadline, maxGrade } = req.body;

    const task = await Task.create({
        title,
        description,
        deadline,
        maxGrade
    });


    res.status(201).json(createResponse(task, "Task created successfully", ErrorStatus.success));

})

// admin edit task
export const editTask = ErrorHandler(async (req: Request, res: Response) => {

    const {id} = req.params;

    if(!id) {
        return res.status(400).json(createResponse(null, "Task id is required", ErrorStatus.fail));
    }

    const {title, description, deadline, maxGrade} = req.body;

    const oldTask = await Task.findById(id);

    if(!oldTask) {
        return res.status(404).json(createResponse(null, "Task not found", ErrorStatus.fail));
    }

    const updatedTask = await Task.findByIdAndUpdate(id, {
        title,
        description,
        deadline,
        maxGrade
    }, {new: true});

    return res.status(200).json(createResponse(updatedTask, "Task updated successfully", ErrorStatus.success));



})

// admin delete task if has no submissions or make isDeleted true if has submissions

export const deleteTask = ErrorHandler(async (req: Request, res: Response) => {
    const {id} = req.params;

    if(!id) {
        return res.status(400).json(createResponse(null, "Task id is required", ErrorStatus.fail));
    }

    const oldTask = await Task.findById(id);

    if(!oldTask) {
        return res.status(404).json(createResponse(null, "Task not found", ErrorStatus.fail));
    }

    // check if task has submissions

    if(1) {
        const taskMarkedToDelete = await Task.findByIdAndUpdate(id, {
            isDeleted: true
        }, {new: true});
        return res.status(400).json(createResponse(null, "Task has submissions, cannot delete", ErrorStatus.fail));
    }
    else {
        await Task.findByIdAndDelete(id);
        return res.status(200).json(createResponse(null, "Task deleted successfully", ErrorStatus.success));
    }


    


})


// get all tasks
export const getAllTasks = ErrorHandler(async (req: Request, res: Response) => {

    const {limit,page}=req.query;

    const taskLimit = Number(limit) || 10;
    const taskPage = Number(page) || 1;
    const skip = (taskPage - 1) * taskLimit;

    const payload = req.user as JwtPayload & { id: string };
    const userRole = await User.findById(payload.id).select('role');

    if(userRole?.role === "admin") {
        const tasks = await Task.find().skip(skip).limit(taskLimit);
        return res.status(200).json(createResponse(tasks, "Tasks fetched successfully", ErrorStatus.success));
    }
    else {
        const tasks = await Task.find({isDeleted: false}).skip(skip).limit(taskLimit);
        return res.status(200).json(createResponse(tasks, "Tasks fetched successfully", ErrorStatus.success));
    }
    

})


export const getTaskById = ErrorHandler(async (req: Request, res: Response) => {
    
    const {id} = req.params;

    if(!id) {
        return res.status(400).json(createResponse(null, "Task id is required", ErrorStatus.fail));
    }

    const task = await Task.findById(id);

    if(!task) {
        return res.status(404).json(createResponse(null, "Task not found", ErrorStatus.fail));
    }

    return res.status(200).json(createResponse(task, "Task fetched successfully", ErrorStatus.success));
})

