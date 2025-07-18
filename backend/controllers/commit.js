import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function commitRepo(message) {
	console.log("commit command called");

	const repoPath = path.resolve(process.cwd(), ".myGit");
	const stagingPath = path.join(repoPath, "staging");
	const commitPath = path.join(repoPath, "commits");

	try {
		const commitID = uuidv4();
		const commitDir = path.join(commitPath, commitID);
		await fs.mkdir(commitDir, { recursive: true });

		const files = await fs.readdir(stagingPath);
		for (const file of files) {
			await fs.copyFile(
				path.join(stagingPath, file),
				path.join(commitDir, file)
			);
		}

        await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify({message, data: new Date().toISOString()}));

        console.log(`Commit ${commitID} created with message: ${message}`);
	} catch (err) {
		console.error("Error in commiting file: ", err);
	}
}
