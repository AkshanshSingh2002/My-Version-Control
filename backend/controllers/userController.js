export const getAllUsers = (req, res) => {
    res.send("All user fetched!");
};

export const signup = (req, res) => {
    res.send("Signup!");
};

export const login = (req, res) => {
    res.send("Login!");
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

// export default {      if using require require()
//     getAllUsers,
//     signup,
//     login,
//     getUsersProfile,
//     updateUsersProfile,
//     deleteUsersProfile, 
// }