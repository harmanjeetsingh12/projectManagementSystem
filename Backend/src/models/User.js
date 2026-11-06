import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: false
        },

        provider: {
            type: String,
            enum: ["local", "google", "microsoft"],
            default: "local"
        },

        providerId: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", userSchema);