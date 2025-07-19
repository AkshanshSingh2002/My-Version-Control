import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

export async function createIssue(req, res) {
	const { title, description } = req.body;
	const { id } = req.params;

	try {
		const issue = new Issue({
			title,
			description,
			repository: id,
		});

		await issue.save();

		res.status(201).json(issue);
	} catch (error) {
		console.error("Error during Issue Creation:", error.message);
		res.status(500).send("Server error during Issue Creation.");
	}
}

export async function updateIssueById(req, res) {
	const { id } = req.params;
    const {title, description, status} = req.body;

    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({ error: "Issue not found!"});
        }

        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();

        res.json(issue, { message: "Issue updated successfully!" });

    } catch (error) {
        console.error("Error during Issue Updation:", error.message);
		res.status(500).send("Server error during Issue Updation.");
    }
}

export async function deleteIssueById(req, res) {
	const { id } = req.params;
    try {
        const issue = await Issue.findByIdAndDelete(id);
        if (!issue) {
            return res.status(404).json({ error: "Issue not found!"});
        }

        res.json({ message: "Issue deleted successfully!"});
    } catch (error) {
        console.error("Error during Deletion Updation:", error.message);
		res.status(500).send("Server error during Deletion Updation.");
    }
}

export async function getAllIssues(req, res) {
	const { id } = req.params;
    try {
        const issues = await Issue.find({ repository: id});
        if (!issues) {
            return res.status(404).json({ error: "Issue not found!"});
        }
        res.status(200).json(issues);
    } catch (error) {
        onsole.error("Error during Fetching Issues:", error.message);
		res.status(500).send("Server error during Fetching Issues.");
    }
}

export async function getIssueById(req, res) {
	const { id } = req.params;

    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({ error: "Issue not found!"});
        }

        res.json(issue);

    } catch (error) {
        console.error("Error during Issue Updation:", error.message);
		res.status(500).send("Server error during Issue Updation.");
    }
}
