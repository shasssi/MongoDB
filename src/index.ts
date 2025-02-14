import dotenv from "dotenv";
import DBConnect from "./db";
import Delete from "./controllers/delete";
import Create from "./controllers/create";
import Update from "./controllers/update";
import Read from "./controllers/read";
import { count, group, limit, sort } from "./aggregate";
import { aggregatePagination, pagination } from "./pagination";
dotenv.config();

async function initDB() {
    const dbInstance = await DBConnect.connect(process.env.MONGODB_URL || '');
    // const dbInstance1 = await DBConnect.connect(process.env.MONGODB_URL || '');
    // console.log(dbInstance === dbInstance1);
}
async function createAction() {
    const newUser = await Create.collection('user')?.singleInsert({
        name: 'xxxxxx',
        firstName: 'xxxxx',
        lastName: 'xxxx',
        age: 30
    });
    const newOrder = await Create.collection('order')?.singleInsert({
        item: 'Kurti',
        amount: 2500,
        user: newUser?._id
    })
    const newUsers = await Create.collection('user')?.bulkInsert([
        {
            firstName: 'Sr....',
            lastName: 'Kumar',
            age: 21
        },
        {
            firstName: 'R....',
            lastName: 'Kumari',
            age: 24,
        }
    ]);
}
async function deleteAction() {
    const result = await Delete.collection('user')?.findByIdAndDelete('670b6da0f5dfa4b31b9270f5');
    // const result1 = await Delete.collection('user')?.deleteOne({ age: { $gt: 39 } });
    // const result2 = await Delete.collection('user')?.deleteMany({ age: { $gt: 33 } });
    // const result3 = await Delete.collection('user')?.deleteAll();
    console.log(result);
}
async function updateAction() {
    const result1 = await Update.collection('order')?.findByIdAndUpdate("67081c5c1f4465ce739c9bf7", { amount: 300 });
    // const result1 = await Update.collection('order')?.updateOne({ amount: {$gt: 200, $lt: 900} }, { amount: 400 });
    // const result1 = await Update.collection('order')?.updateMany({ amount: {$gt: 200, $lt: 900} }, { amount: 400 });
    console.log(result1);
}
async function readAction() {
    const result1 = await Read.collection('user')?.find();
    const result2 = await Read.collection('user')?.find({ lastName: 'Kumari' });
    const result3 = await Read.collection('user')?.findById('67081c5b1f4465ce739c9bf4');
    const result4 = await Read.collection('user')?.findOne({ lastName: 'Kumari' });
    console.log(result4);
}

initDB();
// createAction();
// deleteAction();
// updateAction();
// readAction();
// group();
// sort();
// limit();
// count();
// pagination();
// aggregatePagination();
