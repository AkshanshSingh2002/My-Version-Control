import fs from "fs/promises";
import path from "path";


export async function initRepo() {
	console.log("init command called");

    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        
    } catch (err) {
        console.error("Error initialising repository", err);

    }
}


