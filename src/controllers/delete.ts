import mongoose from "mongoose";
import Order from "../models/order";
import User from "../models/user";

interface IDelete {
    deleteOne(id: string): void;
    deleteMany(data: any): void;
    deleteAll(): void;
    deleteOneByFilter?(data: any): any;
}

class UserCollection implements IDelete {
    async deleteOne(id: string) {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    }
    async deleteOneByFilter(data: any) {
        const deletedUser = await User.deleteOne({
            ...data,
        });
        return deletedUser;
    }
    async deleteMany(data: any) {
        const deletedUser = await User.deleteMany({
            ...data
        });
        return deletedUser;
    }
    async deleteAll() {
        const deletedUser = await User.deleteMany({});
        // drop collection from DB
        // const deletedUser = await User.collection.drop();
        return deletedUser;
    }
}

class OrderCollection implements IDelete {
    async deleteOne(id: string) {
        const deletedOrder = await Order.findByIdAndDelete(id);
        return deletedOrder;
    }
    async deleteOneByFilter(data: any) {
        const deletedOrder = await Order.deleteOne({
            ...data,
        });
        return deletedOrder;
    }
    async deleteMany(data: any) {
        const deletedOrder = await Order.deleteMany({
            ...data,
        });
        return deletedOrder;
    }
    async deleteAll() {
        const deletedOrder = await Order.deleteMany({});
        // const deletedOrder = await Order.collection.drop();
        return deletedOrder;
    }
}

// delete logic - factory design
export default class Delete {
    static collection(name: string) {
        if (name.toLowerCase() === 'user') {
            return new UserCollection();
        } else if (name.toLowerCase() === 'order') {
            return new OrderCollection();
        }
    }
}