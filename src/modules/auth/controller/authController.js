// Require Auth Service :
const authService = require("../../../../src/modules/auth/service/authService");

//  Register :
exports.registerUser = async (req, res) => {
    try {
        const result = await authService.registerUserService(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }

};

// Login :
exports.loginUser = async (req, res) => {
    try {
        const result = await authService.loginUserService(req.body);

        res.status(200).json({
            success: true,
            message: "Login successfully",
            data: result,
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }

};

// Get All Users :
exports.getAllUsers = async (req, res) => {
    try {
        const users = await authService.getAllUsersService();

        res.status(200).json({
            success: true,
            data: users,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};

// Get Single User :
exports.getSingleUser = async (req, res) => {
    try {
        const user = await authService.getSingleUserService(req.params.id);

        res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};

// Delete User :
exports.deleteUser = async (req, res) => {
    try {
        await authService.deleteUserService(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};

// Block User :
exports.blockUser = async (req, res) => {
    try {
        const user = await authService.blockUserService(req.params.id);

        res.status(200).json({
            success: true,
            message: "User blocked successfully",
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};

// Unblock User :
exports.unblockUser = async (req, res) => {
    try {
        const user = await authService.unblockUserService(req.params.id);

        res.status(200).json({
            success: true,
            message: "User unblocked successfully",
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};

//  Get Profile :
exports.getProfile = async (req, res) => {
    try {
        const user = await authService.getProfileService(req.user._id);

        res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};