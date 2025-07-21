import React, { useState, useEffect } from "react";
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

const Login = () => {

	// useEffect(() => {
	// 	localStorage.removeItem("token");
	// 	localStorage.removeItem("userId");
	// 	setCurrentUser(null);
	// });

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const { setCurrentUser } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const res = await axios.post("http://localhost:3000/login", {
				email: email,
				password: password,
			});

			localStorage.setItem("token", res.data.token);
			localStorage.setItem("userId", res.data.userId);

			setCurrentUser(res.data.userId);
			setLoading(false);

			window.location.href = "/";
		} catch (err) {
			console.error(err);
			alert("Login Failed!");
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

				<Box component="form" className="login-box" onSubmit={handleLogin}>
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
							"Login"
						)}
					</Button>
				</Box>

				<div className="pass-box">
					<Typography variant="body2">
						New to GitHub? <Link to="/signup">Create an account</Link>
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default Login;
