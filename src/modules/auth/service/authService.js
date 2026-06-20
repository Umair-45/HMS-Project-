// Require Bcrypt :
const bcrypt = require("bcryptjs");

// Require Auth Model And Utils :
const Auth = require("../../../../src/modules/auth/model/authModel");
const generateToken = require("../../../../src/utils/generateToken");

// Logic For Register User :
exports.registerUserService = async (data) => {
    const { username, password, role,allowedSlipTypes } = data;

    // Check User Already Exist :
    const existingUser = await Auth.findOne({ username });

    if (existingUser) {
        throw new Error("Username already exists !");
    }

    // Hash Password :
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User Account In Database :
    const user = await Auth.create({
        username,
        password: hashedPassword,
        role,
        allowedSlipTypes,
    });

    //    Using Return :
    return {
        user,
        token: generateToken(user),
    };

};

// Logic For Login User :
exports.loginUserService = async (data) => {
    const { username, password } = data;

    // Find User In 
    const user = await Auth.findOne({ username });

    // Using If :
    if (!user) {
        throw new Error("Invalid credentials");
    }

    // Check If User Block :
    if (user.isBlocked) {
        throw new Error("User is blocked");
    }

    // Compare Password ;
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // Using Return :
    return {
        user,
        token: generateToken(user),
    };
};

// Logic For Get All Users :
exports.getAllUsersService = async () => {
    return await Auth.find().select("-password");
};

// Logic For Single User :
exports.getSingleUserService = async (id) => {
    return await Auth.findById(id).select("-password");
};

// Logic For Delete User :
exports.deleteUserService = async (id) => {
    return await Auth.findByIdAndDelete(id);
};

// Logic For Block User :
exports.blockUserService = async (id) => {
    return await Auth.findByIdAndUpdate(
        id,
        {
            isBlocked: true,
        },
        {
            new: true,
        }
    ).select("-password");
};

// Logic For Unblock User :
exports.unblockUserService = async (id) => {
    return await Auth.findByIdAndUpdate(
        id,
        {
            isBlocked: false,
        },
        {
            new: true,
        }
    ).select("-password");
};

// Logic For Get User Profile :
exports.getProfileService = async (id) => {
    return await Auth.findById(id).select("-password");
};