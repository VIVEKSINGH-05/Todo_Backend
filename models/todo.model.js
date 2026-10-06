// models/todo.model.js, We use mongoose to define the schema for our todo items and create a model based on that schema. This model will be used to interact with the MongoDB database.
// Model define Data Structure

import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Todo", todoSchema);