// components/GitHubProfile.jsx
import React, { useEffect, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Container,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import axios from "axios";
import BookIcon from "@mui/icons-material/Book";
import { styles } from "./githubProfileStyles";
import Navbar from "../Navbar.jsx";
import { useNavigate } from "react-router-dom";
import HeatMapProfile from "./HeatMap.jsx";
import { useAuth } from "../../authContext.jsx";

const Profile = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const [userDetails, setUserDetails] = useState("");
	const { setCurrentUser } = useAuth();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserDetails = async () => {
			const userId = localStorage.getItem("userId");
			if (userId) {
				try {
					const responce = await axios.get(
						`http://localhost:3000/userProfile/${userId}`
					);
					setUserDetails(responce.data);
				} catch (err) {
					console.error("Error fetching user details:", err);
				}
			}
		};
		fetchUserDetails();
	}, []);

	return (
		<Box sx={styles.container}>
			<Navbar />

			<Container sx={{ mt: 3 }}>
				<Tabs
					value={tabIndex}
					onChange={(e, newValue) => setTabIndex(newValue)}
					textColor="inherit"
					indicatorColor="secondary"
				>
					<Tab icon={<BookIcon />} iconPosition="start" label="Overview" />
					<Tab label="Starred Repositories" />
				</Tabs>
			</Container>

			<Container
				sx={{
					mt: 6,
					textAlign: "center",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Box sx={{ padding: 2, textAlign: "center" }}>
					<Avatar sx={styles.avatar} />
					<Typography variant="h6" sx={styles.username}>
						{userDetails.username}
					</Typography>
					<Button variant="contained" sx={styles.followButton}>
						Follow
					</Button>

					<Box sx={styles.followerContainer}>
						<Button variant="text" sx={styles.followerButton}>
							10 Follower
						</Button>
						<Button variant="text" sx={styles.followerButton}>
							3 Following
						</Button>
					</Box>
				</Box>

				<Box sx={{ mt: 4, textAlign: "left" }}>
					<HeatMapProfile />
				</Box>
			</Container>

			<Container style={{textAlign: "center", width: "50%" }}>
				<Box>
					<Button onClick={() => {
						localStorage.removeItem("token");
						localStorage.removeItem("userId");
						setCurrentUser(null);

						navigate("/auth");
						//window.location.href= "/auth";;
					}}
					sx={styles.logoutButton}
					id="logout"
					>
						Logout
					</Button>
				</Box>
			</Container>
		</Box>
	);
};

export default Profile;
