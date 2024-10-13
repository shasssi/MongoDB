import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        item: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model("orders", orderSchema);
export default Order;