import Order from "../models/order";
import User from "../models/user";

interface IRead {
    find(data: any): void;
    findById(id: string): void;
    findOne(data: any): void;
}

class Collection implements IRead {
    model: any;
    constructor(model: any) {
        this.model = model;
    }
    async find(data: any = {}) {
        const result = await this.model.find(data);
        return result;
    }
    async findById(id: string) {
        const result = await this.model.findById(id);
        return result;
    }
    async findOne(data: any) {
        const result = await this.model.findOne(data);
        return result;
    }
}

// read logic - factory design
export default class Read {
    static collection(name: string) {
        if (name.toLowerCase() === 'user') {
            return new Collection(User);
        } else if (name.toLowerCase() === 'order') {
            return new Collection(Order);
        }
    }
}