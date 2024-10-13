import Order from "../models/order";
import User from "../models/user";

interface IUpdate {
    findByIdAndUpdate(id: string, data: any): void;
    updateOne(filter: any, data: any): void,
    updateMany(filter: any, data: any): void
}

class UserCollection implements IUpdate {
    async findByIdAndUpdate(id: string, data: any) {
        const updatedUser = await User.findByIdAndUpdate(id, { ...data });
        return updatedUser;
    }
    async updateOne(filter: any, data: any) {
        const updatedUser = await User.updateOne({ ...filter }, { $set: { ...data } });
        return updatedUser;
    }
    async updateMany(filter: any, data: any) {
        const updatedUser = await User.updateMany({ ...filter }, { ...data });
        return updatedUser;
    }
}

class OrderCollection implements IUpdate {
    async findByIdAndUpdate(id: string, data: any) {
        const updatedUser = await Order.findByIdAndUpdate(id, { ...data });
        return updatedUser;
    }
    async updateOne(filter: any, data: any) {
        const updatedUser = await Order.updateOne({ ...filter }, { ...data });
        return updatedUser;
    }
    async updateMany(filter: any, data: any) {
        const updatedUser = await Order.updateMany({ ...filter }, { ...data });
        return updatedUser;
    }
}

// update logic - factory design
export default class Update {
    static collection(name: string) {
        if (name.toLowerCase() === 'user') {
            return new UserCollection();
        } else if (name.toLowerCase() === 'order') {
            return new OrderCollection();
        }
    }
}