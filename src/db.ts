import mongoose from "mongoose";

export class DBConnect {
    static dbInstance: any;
    static async connect(url: string) {
        if (!this.dbInstance) {
            try {
                this.dbInstance = await mongoose.connect(url);
                console.log("MongoDB connected successfully");
                return this.dbInstance;
            } catch (error) {
                console.log("Mongodb connection error: ", error);
            }
        }
        return this.dbInstance;
    }
}

