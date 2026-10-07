// Inside controllers folder, This file will contain all the logics.
import mongoose from "mongoose";
import Todo from "../models/todo.model.js";
const { asyncHandler } = await import("../middleware/asyncHandler.js");

// Create a new todo item
export const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  //Validation
  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }
  const todo = await Todo.create({
    title,
    description,
  });
  return res.status(201).json({
    success: true,
    message: "Todo created successfully",
    todo,
  });
});

// Get all todo items
export const getTodos = asyncHandler(async (req, res) => {
  //query params
  const { search, sort, page = 1, limit = 10 } = req.query;
  let query = {};
  // Search
  if (search) {
    query.title = { $regex: search, $options: "i" }; // i for case-insensitive search
  }
  //Sorting
  let sortOption = {};
  if (sort === "asc")
    sortOption.title = 1; // 1 for ascending order
  else sortOption.title = -1; // -1 for descending order Default
  // Pagination
  const skip = (page - 1) * limit;
  const todos = await Todo.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(parseInt(limit));
  const totalTodos = await Todo.countDocuments(query);
  return res.status(200).json({
    success: true,
    message: "Todos fetched successfully",
    total: totalTodos,
    page: Number(page),
    limit: Number(limit),
    data: todos,
  });
});

//Get a single todo item by ID
export const getTodoId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //Validate ID based on mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Todo ID",
    });
  }
  const todos = await Todo.findById(id);
  if (!todos) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Todo fetched successfully",
    todo: todos,
  });
});

// Update a todo item by ID - PUT API
export const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  //Validate ID based on mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Todo ID",
    });
  }
  //Valid Input
  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }
  //Update Todo
  const todo = await Todo.findByIdAndUpdate(
    id,
    { title, description },
    { new: true, runValidators: true },
  ); // { new: true } returns the updated document
  // todo not found
  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Todo updated successfully",
    data: todo,
  });
});

// Update a todo item by ID - PATCH API
export const toggleTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //Validate ID based on mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Todo ID",
    });
  }
  //Find the todo item by ID
  const todo = await Todo.findById(id);
  //If todo item not found
  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }
  // Toggle the completed status
  todo.completed = !todo.completed;
  await todo.save();

  return res.status(200).json({
    success: true,
    message: "Todo status toggled successfully",
    data: todo,
  });
});

// Delete a todo item by ID
export const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //Validate ID based on mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Todo ID",
    });
  }

  //Find the todo item by ID and delete it
  const todo = await Todo.findByIdAndDelete(id);

  //If todo item not found
  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
    data: todo,
  });
});
