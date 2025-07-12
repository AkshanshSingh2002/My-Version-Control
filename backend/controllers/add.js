import fs from "fs/promises";
import path from "path";

export async function addRepo(filePath) {
    console.log("Adding function called");

    const repoPath = path.resolve(process.cwd(), ".myGit");
    const stagingPath = path.join(repoPath, "staging");

    try {
        await fs.mkdir(stagingPath, {recursive: true});
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log(`File ${fileName} added to the staging area`);
    } catch (err) {
        console.error("Error in adding file: ", err);
    }
}