import fs from 'fs/promises';
import path from 'path';
import {s3, S3_BUCKET} from '../config/aws-config.js';

export async function pushRepo() {
    console.log("push command called");

    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const commitDirs = await fs.readdir(commitsPath);
        for (const commitDir of commitDirs) {
            const commitPath = path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitPath);

            for (const file of files) {
                const filePath = path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);
                const params = {                                  // this is how we are going to save it on AWS (S3) 
                    Bucket: S3_BUCKET,
                    Key: `commits/${commitDir}/${file}`,
                    Body: fileContent,
                };

                await s3.upload(params).promise();
            }
        }

        console.log("All commits pushed to S3");
    } catch (err) {
        console.error("Error pushing to S3: ", err);
    }
}