import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import User from "../models/userModel.js";
import "dotenv/config";

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

export const getAllUsers = (req, res) => {
	res.send("All user fetched!");
};

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
            repositories : [],
            followedUsers : [],
            starRepos : [],
        };

        const result = await usersCollection.insertOne(newUser);
        const token = jwt.sign({id: result.insertedId}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});  
        res.json({token});  

	} catch (error) {
		console.error("Error during signup:", error.message);
        res.status(500).send("Server error during signup.");
	}
};

export async function login(req, res) {
	const { email, password} = req.body;
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

		const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
		res.json({ token, userId: user._id });
	} catch (error) {
		console.error("Error during login: ", error.message);
		res.status(500).send("Server error during login.");
	}
};

export const getUsersProfile = (req, res) => {
	res.send("Profile fetched!");
};

export const updateUsersProfile = (req, res) => {
	res.send("Profile Updated!");
};

export const deleteUsersProfile = (req, res) => {
	res.send("Profile deleted!");
};
