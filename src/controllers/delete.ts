import Order from "../models/order";
import User from "../models/user";

interface IDelete {
    findByIdAndDelete(id: string): void;
    deleteMany(data: any): void;
    deleteAll(): void;
    deleteOne?(data: any): any;
}

class Collection implements IDelete {
    model: any;
    constructor(model: any) {
        this.model = model;
    }
    async findByIdAndDelete(id: string) {
        const deletedOrder = await this.model.findByIdAndDelete(id);
        return deletedOrder;
    }
    async deleteOne(data: any) {
        const deletedOrder = await this.model.deleteOne({
            ...data,
        });
        return deletedOrder;
    }
    async deleteMany(data: any) {
        const deletedOrder = await this.model.deleteMany({
            ...data,
        });
        return deletedOrder;
    }
    async deleteAll() {
        const deletedOrder = await this.model.deleteMany({});
        // const deletedOrder = await Order.collection.drop();
        return deletedOrder;
    }
}

// delete logic - factory design
export default class Delete {
    static collection(name: string) {
        if (name.toLowerCase() === 'user') {
            return new Collection(User);
        } else if (name.toLowerCase() === 'order') {
            return new Collection(Order);
        }
    }
}