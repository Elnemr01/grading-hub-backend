import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    maxGrade: {
        type: Number,
        required: true,
        min: 1,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},{ timestamps: true }
);

taskSchema.index({ isDeleted: 1, deadline: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;