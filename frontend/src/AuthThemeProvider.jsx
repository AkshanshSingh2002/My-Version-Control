import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// const darkTheme = createTheme({
// 	palette: {
// 		mode: "dark",
// 		primary: {
// 			main: "#238636",
// 		},
// 		background: {
// 			default: "#0c1116",
// 			paper: "#161a23",
// 		},
// 		text: {
// 			primary: "#f1f6fd",
// 		},
// 	},
// 	components: {
// 		MuiTextField: {
// 			styleOverrides: {
// 				root: {
// 					maxWidth: "250px",
// 					"& .MuiOutlinedInput-root": {
// 						backgroundColor: "#0c1116",
// 						"& fieldset": {
// 							borderColor: "#f1f6fd",
// 						},
// 						"&:hover fieldset": {
// 							borderColor: "lightblue",
// 						},
// 					},
// 				},
// 			},
// 		},
// 	},
// });

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#238636",
			light: "#4caf50",
			dark: "#1b5e20",
		},
		secondary: {
			main: "#64b5f6",
			light: "#90caf9",
			dark: "#1976d2",
		},
		background: {
			default: "#0c1116",
			paper: "#161a23",
		},
		text: {
			primary: "#f1f6fd",
			secondary: "#b3b9c4",
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					maxWidth: "320px",
					width: "100%",
					margin: "8px 0",
					"& .MuiOutlinedInput-root": {
						backgroundColor: "rgba(12, 17, 22, 0.8)",
						backdropFilter: "blur(10px)",
						color: "#f1f6fd",
						height: "40px",
						borderRadius: "12px",
						fontSize: "16px",
						fontWeight: "400",
						transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
						position: "relative",
						overflow: "hidden",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							borderRadius: "12px",
							padding: "2px",
							background:
								"linear-gradient(135deg, rgba(35, 134, 54, 0.3), rgba(100, 181, 246, 0.3))",
							mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
							maskComposite: "exclude",
							pointerEvents: "none",
							opacity: 0,
							transition: "opacity 0.3s ease",
						},
						"& fieldset": {
							borderColor: "rgba(241, 246, 253, 0.23)",
							borderWidth: "1.5px",
							borderRadius: "12px",
							transition: "all 0.3s ease",
						},
						"&:hover": {
							backgroundColor: "rgba(12, 17, 22, 0.95)",
							transform: "translateY(-2px)",
							boxShadow:
								"0 8px 25px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(100, 181, 246, 0.2)",
							"&::before": {
								opacity: 1,
							},
							"& fieldset": {
								borderColor: "rgba(100, 181, 246, 0.6)",
								boxShadow: "0 0 20px rgba(100, 181, 246, 0.2)",
							},
						},
						"&.Mui-focused": {
							backgroundColor: "rgba(12, 17, 22, 1)",
							transform: "translateY(-3px)",
							boxShadow:
								"0 12px 35px rgba(35, 134, 54, 0.3), 0 0 0 2px rgba(35, 134, 54, 0.3)",
							"&::before": {
								opacity: 1,
							},
							"& fieldset": {
								borderColor: "#238636",
								borderWidth: "2px",
								boxShadow: "0 0 25px rgba(35, 134, 54, 0.4)",
							},
						},
					},
					"& .MuiInputLabel-root": {
						color: "rgba(241, 246, 253, 0.7)",
						fontWeight: "500",
						fontSize: "16px",
						letterSpacing: "0.5px",
						transition: "all 0.3s ease",
						"&.Mui-focused": {
							color: "#238636",
							fontWeight: "600",
							textShadow: "0 0 10px rgba(35, 134, 54, 0.5)",
						},
					},
					"& .MuiOutlinedInput-input": {
						padding: "16px 18px",
						fontSize: "16px",
						fontWeight: "400",
						letterSpacing: "0.3px",
						"&::placeholder": {
							color: "rgba(179, 185, 196, 0.6)",
							opacity: 1,
						},
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					width: "320px",
					height: "40px",
					borderRadius: "12px",
					fontSize: "16px",
					fontWeight: "600",
					textTransform: "uppercase",
					letterSpacing: "1px",
					position: "relative",
					overflow: "hidden",
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					"&.MuiButton-contained": {
						background:
							"linear-gradient(135deg, #238636 0%, #2e7d32 50%, #388e3c 100%)",
						color: "#ffffff",
						boxShadow:
							"0 6px 20px rgba(35, 134, 54, 0.4), 0 0 0 1px rgba(35, 134, 54, 0.1)",
						border: "none",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: "-100%",
							width: "100%",
							height: "100%",
							background:
								"linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
							transition: "left 0.6s ease",
						},
						"&:hover": {
							background:
								"linear-gradient(135deg, #2e7d32 0%, #388e3c 50%, #43a047 100%)",
							transform: "translateY(-3px) scale(1.02)",
							boxShadow:
								"0 12px 35px rgba(35, 134, 54, 0.5), 0 0 0 2px rgba(35, 134, 54, 0.2)",
							"&::before": {
								left: "100%",
							},
						},
						"&:active": {
							transform: "translateY(-1px) scale(0.98)",
						},
						"&:disabled": {
							background:
								"linear-gradient(135deg, rgba(35, 134, 54, 0.4) 0%, rgba(46, 125, 50, 0.4) 100%)",
							color: "rgba(255, 255, 255, 0.5)",
							boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
							transform: "none",
							opacity: 0.6,
						},
					},
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				h4: {
					fontWeight: "700",
					fontSize: "2rem",
					background:
						"linear-gradient(135deg, #f1f6fd 0%, #64b5f6 50%, #238636 100%)",
					backgroundClip: "text",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
					textAlign: "center",
					letterSpacing: "1px",
					textShadow: "0 0 20px rgba(100, 181, 246, 0.3)",
				},
			},
		},
	},
});

const AuthThemeProvider = ({ children }) => {
	return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default AuthThemeProvider;
