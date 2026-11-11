
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

dotenv.config();


const createAdmin = async () => {
    try {
        const {
            MONGODB_URI,
            ADMIN_NAME,
            ADMIN_EMAIL,
            ADMIN_PASSWORD
        } = process.env;

        // Validate environment configuration
        if (!MONGODB_URI || !ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
            throw new Error("Missing required environment variables.");
        }

        // Connect to MongoDB
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
          dbName: "Portfolio"
        });

        console.log("Connected to MongoDB.");

        // Check if admin account already exists
        const existingUser = await User.findOne({
            email: ADMIN_EMAIL
        });

        if (existingUser) {
            console.log("An account with this email already exists.");
            return;
        }

        // Hash admin password
        const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

        // Create administrator
        const admin = await User.create({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            passwordHash,
            role: "admin"
        });

        console.log(`Admin created successfully: ${admin.email}`);

    } catch (error) {
        console.error("Error creating admin:", error.message);
        process.exitCode = 1;

    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
    }
};

createAdmin();
