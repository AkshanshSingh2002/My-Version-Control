import express from "express";
import * as userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/signup", userController.signup); 
userRouter.post("/login", userController.login); 
userRouter.get("/allUsers", userController.getAllUsers); 
userRouter.get("/userProfile/:id", userController.getUsersProfile); 
userRouter.put("/updateProfile/:id", userController.updateUsersProfile); 
userRouter.delete("/deleteProfile/:id", userController.deleteUsersProfile); 

export default userRouter;