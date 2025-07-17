import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import mainRouter from "./routes/main.router.js";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { initRepo } from "./controllers/init.js";
import { addRepo } from "./controllers/add.js";
import { commitRepo } from "./controllers/commit.js";
import { pullRepo } from "./controllers/pull.js";
import { pushRepo } from "./controllers/push.js";
import { revertRepo } from "./controllers/revert.js";

import "dotenv/config";

yargs(hideBin(process.argv))
	.command("start", "Start a new Server", {}, startServer)
	.command("init", "Initialize a new repository", {}, initRepo)
	.command(
		"add <file>",
		"Add a file to the repository",
		(yargs) => {
			yargs.positional("file", {
				describe: "File to add to the staging area",
				type: "string",
			});
		},
		(argv) => {
			addRepo(argv.file);
		}
	)
	.command(
		"commit <message>",
		"Commit a file to the repository",
		(yargs) => {
			yargs.positional("message", {
				describe: "Commit message",
				type: "string",
			});
		},
		(argv) => {
			commitRepo(argv.message);
		}
	)
	.command("push", "Push commits to    S3", {}, pushRepo)
	.command("pull", "Pull commits from S3", {}, pullRepo)
	.command(
		"revert <commitID>",
		"Revert to a specific commit",
		(yargs) => {
			yargs.positional("commitID", {
				describe: "Commit ID to revert to",
				type: "string",
			});
		},
		(argv) => {
			revertRepo(argv.commitID);
		}
	)
	.demandCommand(1, "You need at least one command")
	.help().argv;

function startServer() {
	const app = express();
	const port = process.env.PORT || 3000;

	app.use(bodyParser.json());
	app.use(express.json());

	const mongodbURI = process.env.MONGODB_URI;

	mongoose
		.connect(mongodbURI)
		.then(console.log("Connected to the MongoDB!"))
		.catch((err) => {
			console.error("Unable to connect to the server!!! ", err);
	});

	app.use(cors({origin: "*"}));

	app.use("/", mainRouter);

	let user = "Ashu";

	const httpServer = http.createServer(app);
	const io = new Server(httpServer, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket)=>{
		//  Add user to the connection
		socket.on("joinRoom", (userID) => {
			// Anybody who is loggedin should be able to use socket
			user = userID;
			console.log("=============");
			console.log(user);
			console.log("=============");
			socket.join(userID);
		});
	});

	const db = mongoose.connection;
	db.once("open", async () => {
		console.log("CRUD operations called!");
		// CRUD operation
	});

	httpServer.listen(port, () => {
		console.log(`Server is running on the PORT: ${port}`);
	});
}
