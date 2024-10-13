import mongoose, { Model } from "mongoose";
import Order from "../models/order";
import Users from "../models/user";

interface ICreate {
    singleInsert(data: any): void;
    bulkInsert(data: any): void;
}

class UserCollection implements ICreate {
    async singleInsert(data: any) {
        const newUser = await Users.create({
            ...data,
        });
        return newUser;
    }
    async bulkInsert(data: any) {
        const newUser = await Users.create([
            ...data,
        ]);
        return newUser;
    }
}

class OrderCollection implements ICreate {
    async singleInsert(data: any) {
        const newOrder = await Order.create({
            ...data,
        });
        return newOrder;
    }
    async bulkInsert(data: any) {
        const newOrder = await Order.create([
            ...data,
        ]);
        return newOrder;
    }
}

// create logic - factory design
export default class Create {
    static collection(name: string) {
        if (name.toLowerCase() === 'user') {
            return new UserCollection();
        } else if (name.toLowerCase() === 'order') {
            return new OrderCollection();
        }
    }
}