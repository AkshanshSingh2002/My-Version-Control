import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext.jsx";

import {
	Box,
	Button,
	TextField,
	Typography,
	CircularProgress,
} from "@mui/material";
import "./auth.css";

import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const { setCurrentUser } = useAuth();

	const handleSignup = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const res = await axios.post("http://localhost:3000/signup", {
				email: email,
				password: password,
				username: username,
			});

			localStorage.setItem("token", res.data.token);
			localStorage.setItem("userId", res.data.userId);

			setCurrentUser(res.data.userId); // Set the current user in context
			setLoading(false);

			window.location.href = "/";
		} catch (err) {
			console.error(err);
			alert("Signup Failed!");
			setLoading(false);
		}
	};

	return (
		<div className="login-wrapper">
			<div className="login-logo-container">
				<img className="logo-login" src={logo} alt="Logo" />
			</div>

			<div className="login-box-wrapper">
				<div className="login-heading">
					<Box sx={{ padding: 1 }}>
						<Typography variant="h4" component="h1" gutterBottom>
							Sign Up
						</Typography>
					</Box>
				</div>

				<Box component="form" className="login-box" onSubmit={handleSignup}>
					<TextField
						label="Username"
						name="Username"
						id="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						autoComplete="off"
						margin="normal"
						variant="outlined"
					/>

					<TextField
						label="Email address"
						name="Email"
						id="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete="off"
						margin="normal"
						variant="outlined"
					/>

					<TextField
						label="Password"
						name="Password"
						id="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="off"
						margin="normal"
						variant="outlined"
					/>

					<Button
						type="submit"
						variant="contained"
						className="login-btn"
						disabled={loading}
						sx={{ mt: 2, mb: 2 }}
					>
						{loading ? (
							<>
								<CircularProgress size={20} sx={{ mr: 1 }} />
								Loading...
							</>
						) : (
							"Signup"
						)}
					</Button>
				</Box>

				<div className="pass-box">
					<Typography variant="body2">
						Already have an account? <Link to="/auth">Login</Link>
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default Signup;
