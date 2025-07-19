import express from "express";
import * as repoController from '../controllers/repoController.js';

const repoRouter = express.Router();

repoRouter.post("/repo/create", repoController.createRepository); 
repoRouter.get("/repo/all", repoController.getAllRepository); 
repoRouter.get("/repo/:id", repoController.fetchRepositoryById); 
repoRouter.get("/repo/name/:name", repoController.fetchRepositoryByName); 
repoRouter.get("/repo/user/:userID", repoController.fetchRepositoriesForCurrentUser); 
repoRouter.put("/repo/update/:id", repoController.updateRepositoryById); 
repoRouter.patch("/repo/toggle/:id", repoController.toggleVisibilityById); 
repoRouter.delete("/repo/delete/:id", repoController.deleteRepositoryById); 

export default repoRouter;