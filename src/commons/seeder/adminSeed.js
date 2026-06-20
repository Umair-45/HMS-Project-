// Require Bcrypt :
const bcrypt = require("bcryptjs");

// Require Auth Model :
const Auth = require("../../../src/modules/auth/model/authModel");

// Fuction For Seed Admin :
const seedAdmin = async () => {
    try {
        // Check If Admin Already Exists :
        const existingAdmin = await Auth.findOne({
            role: "ADMIN",
        });

        // If Admin Exists :
        if (existingAdmin) {
            console.log("Admin already exists");

            return;
        }

        // Hash Password :
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            salt
        );

        // Create Admin Account :
        await Auth.create({
            username: process.env.ADMIN_USERNAME,
            password: hashedPassword,
            role: "ADMIN",
        });

        console.log("Default admin created successfully");

    } catch (error) {
        console.log("Admin Seeder Error:", error.message);
    }

};

// Export Module :
module.exports = seedAdmin;