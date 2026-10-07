// Inside routes folder, This file will contain all the routes related to our todo application.

import express from "express";
import {
  createTodo,
  getTodos,
  getTodoId,
  updateTodo,
  toggleTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
const route = express.Router();

// route.get("/", (req, res) => {
//     res.send("Hello from todo.routes.js");
// })

route.post("/todo", createTodo);
route.get("/", getTodos);
route.get("/:id", getTodoId);
route.put("/:id", updateTodo);
route.patch("/:id/toggle", toggleTodo);
route.delete("/:id", deleteTodo);

export default route;
