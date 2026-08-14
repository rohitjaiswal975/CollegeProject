import express from "express";
import { addBlog } from "../controllers/BlogController.js";

const blogRoute = express.Router();

blogRoute.post("/add",addBlog)


export default blogRoute