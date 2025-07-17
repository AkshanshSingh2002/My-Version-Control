export const createRepository = (req, res) => {
    res.send("Repository Created!");
};

export const getAllRepository = (req, res) => {
    res.send("All Repository fetched!");
};

export const fetchRepositoryById = (req, res) => {
    res.send("Repository details fetched!");
};

export const fetchRepositoryByName = (req, res) => {
    res.send("Repository details fetched!");
};

export const fetchRepositoriesForCurrentUser = (req, res) => {
    res.send("Repositorise for Logged In user fetched!!");
};

export const updateRepositoryById = (req, res) => {
    res.send("Repository Updated!");
};

export const toggleVisibilityById = (req, res) => {
    res.send("Visibility Toggled!");
};

export const deleteRepositoryById = (req, res) => {
    res.send("Repository deleted!");
};
