import express from "express";
import {
  adminLogin,
  approvedCommentById,
  deletedCommentById,
  getAllBlogAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminController.js";
import auth from "../middleware/Auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/blogs", auth, getAllBlogAdmin);
adminRouter.get("/comment", auth, getAllComments);
adminRouter.get("/dashboard",auth ,  getDashboard);
adminRouter.post("/delete-comment", auth, deletedCommentById);
adminRouter.post("/approved-comment", auth, approvedCommentById);

export default adminRouter;
