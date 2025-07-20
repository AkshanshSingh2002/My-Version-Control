import React from "react";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
	// Custom hook to use the AuthContext
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (userId) {
			setCurrentUser(userId);
		}
	}, []);

	const value = {
		currentUser,
		setCurrentUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
