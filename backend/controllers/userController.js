import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoClient, ReturnDocument } from "mongodb";
import "dotenv/config";
import { ObjectId } from "mongodb";

const mongodbURI = process.env.MONGODB_URI;

let client;

async function connectClient() {
	if (!client) {
		client = new MongoClient(mongodbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		await client.connect();
	}
}

export const signup = async (req, res) => {
	const { username, password, email } = req.body;
	try {
		await connectClient();
		const db = client.db("githubclone");
		const usersCollection = db.collection("users");

		const user = await usersCollection.findOne({ username });
		if (user) {
			return res.status(400).json({ message: "User already exists!" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = {
			username,
			password: hashedPassword,
			email,
			repositories: [],
			followedUsers: [],
			starRepos: [],
		};

		const result = await usersCollection.insertOne(newUser);
		const token = jwt.sign(
			{ id: result.insertedId },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: "1h" }
		);
		res.json({ token });
	} catch (error) {
		console.error("Error during signup:", error.message);
		res.status(500).send("Server error during signup.");
	}
};

export async function login(req, res) {
	const { email, password } = req.body;
	try {
		await connectClient();
		const db = client.db("githubclone");
		const usersCollection = db.collection("users");

		const user = await usersCollection.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid Credentials!" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid Credentials!" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
			expiresIn: "1h",
		});
		res.json({ token, userId: user._id });
	} catch (error) {
		console.error("Error during login: ", error.message);
		res.status(500).send("Server error during login.");
	}
}

export async function getAllUsers(req, res) {
	try {
		await connectClient();
		const db = client.db("githubclone");
		const usersCollection = db.collection("users");

		const users = await usersCollection.find({}).toArray();
		res.json(users);
	} catch (error) {
		console.error("Error during fetching all users: ", error.message);
		res.status(500).send("Server error during fetching all users!");
	}
}

export async function getUsersProfile(req, res) {
	const currentID = req.params.id;

	try {
		await connectClient();
		const db = client.db("githubclone");
		const usersCollection = db.collection("users");

		const user = await usersCollection.findOne({
			_id: new ObjectId(currentID),
		});
		if (!user) {
			return res.status(404).json({ message: "User not Found!" });
		}

		res.send(user);
	} catch (err) {
		console.error("Error during fetching all users: ", err.message);
		res.status(500).send("Server error during fetching all users!");
	}
}

export async function updateUsersProfile(req, res) {   // not getting correct output
	const currentID = req.params.id;
	const { email, password } = req.body;

	try {
		await connectClient();
		const db = client.db("githubclone");
		const usersCollection = db.collection("users");

		let updateFields = { email };
		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			updateFields.password = hashedPassword;
		}

		const result = await usersCollection.findOneAndUpdate(
			{ _id: new ObjectId(currentID) },
			{ $set: updateFields },
			{ returnDocument: "after" }
		);
		if (!result.value) {
			return res.status(404).json({ message: "User not found!"});
		}

		res.send(result.value);

	} catch (err) {
		console.error("Error during updating: ", err.message);
		res.status(500).send("Server error during fetching all users!");
	}
}

export async function deleteUsersProfile(req, res) {
	const currentID = req.params.id;

	try {
		await connectClient();
		const db = client.db("githubclone");
		const usersCollection = db.collection("users");

		const result = await usersCollection.deleteOne({ _id: new ObjectId(currentID)});

		if (!result.deleteCount == 0) {
			return res.status(404).json({ message: "User not found!"});
		}

		res.json({ message: "User deleted successfully!"});
	} catch (error) {
		console.error("Error during deleting user:", error.message);
		res.status(500).send("Server error during deleting user. ");
	}
}
