import Order from "../models/order";
import User from "../models/user";

interface IUpdate {
    findByIdAndUpdate(id: string, data: any): void;
    updateOne(filter: any, data: any): void;
    updateMany(filter: any, data: any): void;
}

class Collection implements IUpdate {
    model: any;
    constructor(model: any) {
        this.model = model;
    }
    async findByIdAndUpdate(id: string, data: any) {
        const updatedUser = await this.model.findByIdAndUpdate(id, { ...data });
        return updatedUser;
    }
    async updateOne(filter: any, data: any) {
        const updatedUser = await this.model.updateOne({ ...filter }, { $set: { ...data } });
        return updatedUser;
    }
    async updateMany(filter: any, data: any) {
        const updatedUser = await this.model.updateMany({ ...filter }, { ...data });
        return updatedUser;
    }
}

// update logic - factory design
export default class Update {
    static collection(name: string) {
        if (name.toLowerCase() === 'user') {
            return new Collection(User);
        } else if (name.toLowerCase() === 'order') {
            return new Collection(Order);
        }
    }
}