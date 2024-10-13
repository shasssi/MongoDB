import Order from "../models/order";
import User from "../models/user";

interface ICreate {
    singleInsert(data: any): void;
    bulkInsert(data: any): void;
}

class Collection implements ICreate {
    model: any;
    constructor(model: any) {
        this.model = model;
    }
    async singleInsert(data: any) {
        const newUser = await this.model.create({
            ...data,
        });
        return newUser;
    }
    async bulkInsert(data: any) {
        const newUser = await this.model.create([
            ...data,
        ]);
        return newUser;
    }
}

// create logic - factory design
export default class Create {
    static collection(name: string) {
        if (name.toLowerCase() === 'user') {
            return new Collection(User);
        } else if (name.toLowerCase() === 'order') {
            return new Collection(Order);
        }
    }
}