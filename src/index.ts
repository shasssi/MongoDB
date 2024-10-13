import dotenv from "dotenv";
import { DBConnect } from "./db";
import Delete from "./controllers/delete";
import Create from "./controllers/create";
import Update from "./controllers/update";

dotenv.config();

async function initDB() {
    const dbInstance = await DBConnect.connect(process.env.MONGODB_URL || '');
    // const dbInstance1 = await DBConnect.connect(process.env.MONGODB_URL || '');
    // console.log(dbInstance === dbInstance1);
}
async function createAction() {
    const newUser = await Create.collection('user')?.singleInsert({
        name: 'Madhuri',
        firstName: 'Madhuri',
        lastName: 'Kumari',
        age: 30
    });
    const newOrder = await Create.collection('order')?.singleInsert({
        item: 'Kurti',
        amount: 2500,
        user: newUser?._id
    })
    const newUsers = await Create.collection('user')?.bulkInsert([
        {
            firstName: 'Shravan',
            lastName: 'Kumar',
            age: 21
        },
        {
            firstName: 'Ruby',
            lastName: 'Kumari',
            age: 24,
        }
    ]);
}
async function deleteAction() {
    const result = await Delete.collection('user')?.deleteOne('6708150dd02400126eb3fa76');
    const result1 = await Delete.collection('user')?.deleteOneByFilter({ age: { $gt: 39 } });
    const result2 = await Delete.collection('user')?.deleteMany({ age: { $gt: 33 } });
    const result3 = await Delete.collection('user')?.deleteAll();
    console.log(result);
}
async function updateAction() {
    // const result1 = await Update.collection('order')?.findByIdAndUpdate("67081c5c1f4465ce739c9bf7", { amount: 400 });
    const result1 = await Update.collection('order')?.updateMany({ amount: {$gt: 200, $lt: 900} }, { amount: 400 });
    console.log(result1);
}

initDB();
// createAction();
// deleteAction();
// updateAction();
