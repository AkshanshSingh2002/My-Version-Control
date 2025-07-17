import express from "express";
import * as userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers); 
userRouter.post("/signup", userController.signup); 
userRouter.post("/login", userController.login); 
userRouter.get("/getProfile", userController.getUsersProfile); 
userRouter.put("/updateProfile", userController.updateUsersProfile); 
userRouter.delete("/deleteProfile", userController.deleteUsersProfile); 

export default userRouter;