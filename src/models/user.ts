import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('users', userSchema);
export default User;