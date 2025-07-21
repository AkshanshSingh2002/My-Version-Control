import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

export async function createRepository(req, res) {
	const { owner, name, issues, content, description, visibility } = req.body;

	try {
		if (!name) {
			return res.status(400).send("Name are required to create a repository.");
		}
		if (!mongoose.Types.ObjectId.isValid(owner)) {
			return res.status(400).json({ error: "Invalid user ID." });
		}

		const newRepository = new Repository({
			name,
			issues,
			content,
			owner,
			description,
			visibility,
		});

		const result = await newRepository.save();

		res.status(201).json({
			message: "Repository created successfully!",
			repositoryID: result._id,
		});
	} catch (error) {
		console.error("Error during Repository Creation:", error.message);
		res.status(500).send("Server error during Repository Creation.");
	}
}

export async function getAllRepository(req, res) {
	try {
		const repositories = await Repository.find({})
			.populate("owner")
			.populate("issues");

		res.json(repositories);
	} catch (error) {
		console.error("Error during Fetching Repositories:", error.message);
		res.status(500).send("Server error during Fetching Repositories.");
	}
}

export async function fetchRepositoryById(req, res) {
	const { id } = req.params;

	try {
		const repository = await Repository.find({ _id: id })
			.populate("owner")
			.populate("issues");
		if (!repository) {
			return res.status(404).json({ message: "Repository not found!" });
		}
		res.json(repository);
	} catch (error) {
		console.error("Error during Fetching Repository:", error.message);
		res.status(500).send("Server error during Fetching Repository.");
	}
}

export async function fetchRepositoryByName(req, res) {
	const { name } = req.params;

	try {
		const repository = await Repository.find({ name: name })
			.populate("owner")
			.populate("issues");
		if (!repository) {
			return res.status(404).json({ message: "Repository not found!" });
		}
		res.json(repository);
	} catch (error) {
		console.error("Error during Fetching Repository:", error.message);
		res.status(500).send("Server error during Fetching Repository.");
	}
}

export async function fetchRepositoriesForCurrentUser(req, res) {
	const { userID } = req.params;

	try {
		const repositories = await Repository.find({ owner: userID });

		if (!repositories || repositories.length === 0) {
			return res
				.status(404)
				.json({ error: "No repositories found for this user!" });
		}

		res.json({ message: "Repositories found!", repositories });
	} catch (error) {
		console.error("Error during Fetching User Repository:", error.message);
		res.status(500).send("Server error during Fetching User Repository.");
	}
}

export async function updateRepositoryById(req, res) {
	const { id } = req.params;
    const { content, description} = req.body;

    try {
        const repository = await Repository.findById(id);
        if (!repository) {
			return res
				.status(404)
				.json({ error: "No repository found!" });
		}

        repository.content.push(content);       //Always adds the new content to the array
        repository.description = description;   //Replaces the entire description

        const updatedRepository = await repository.save();
        res.json({
            message: "Repository updated successfully!",
            repository: updatedRepository,
        });

    } catch (error) {
        console.error("Error during Updating User Repository:", error.message);
		res.status(500).send("Server error during Updating User Repository.");
    }
}

export async function toggleVisibilityById(req, res) {
    const { id } = req.params;

    try {
        const repository = await Repository.findById(id);
        if (!repository) {
			return res
				.status(404)
				.json({ error: "No repository found!" });
		}

        repository.visibility = !repository.visibility;

        const updatedRepository = await repository.save();
        res.json({
            message: "Repository visibility toggled successfully!",
            repository: updatedRepository,
        });

    } catch (error) {
        console.error("Error during Updating User Repository:", error.message);
		res.status(500).send("Server Error");
    }
}

export async function deleteRepositoryById(req, res) {
	const { id } = req.params;

    try {
        const repository = await Repository.findByIdAndDelete(id);
        if (!repository) {
			return res
				.status(404)
				.json({ error: "No repository found!" });
		}

        res.json({message: "Repository deleted successfully!"});

    } catch (error) {
        console.error("Error during Updating User Repository:", error.message);
		res.status(500).send("Server Error");
    }
}
