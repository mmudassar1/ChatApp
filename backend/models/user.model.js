import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
    }
}, { timestamps: true }); // created at updated at timestamps

const User = mongoose.model("User", userSchema)

export default User;

