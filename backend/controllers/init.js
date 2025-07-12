import fs from "fs/promises";
import path from "path";


export async function initRepo() {
	console.log("init command called");

    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        await fs.mkdir(repoPath, { recursive: true});
        await fs.mkdir(commitsPath, { recursive: true});
        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify({bucket: process.env.S3_BUCKET})
        );
        console.log("Repository initialised!")
    } catch (err) {
        console.error("Error initialising repository", err);

    }
}


