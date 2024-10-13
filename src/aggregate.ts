import User from "./models/user";

export async function group() {
    const result = await User.aggregate([
        {
            $group: {
                _id: null,
                averageAge: {
                    $avg: "$age"
                },
                count: {
                    $sum: 1
                }
            }
        },
    ]);
    console.log(result);
    const result1 = await User.aggregate([
        {
            $group: {
                _id: "$gender",
                averageAge: {
                    $avg: "$age"
                },
                count: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                count: 1 // 1: asc, -1: desc
            }
        }
    ]);
    console.log(result1);
}

export async function sort() {
    const result = await User.aggregate([
        {
            $sort: {
                'age': -1
            }
        },
        {
            $project: {
                "firstName": 1,
                "lastName": 1,
                "age": 1
            }
        },
    ]);
    console.log(result);
}

export async function limit() {
    const result = await User.aggregate([
        {
            $limit: 2
        }
    ]);
    console.log(result);
}

export async function count() {
    const result = await User.aggregate([
        {
            $count: 'totalUsers'
        }
    ]);
    console.log(result);
    const result1 = await User.aggregate([
        {
            $match: { gender: 'Male' }
        },
        {
            $count: 'totalMale'
        }
    ]);
    console.log(result1);
}

export async function addFields() {
    const result = await User.aggregate([
        {
            $addFields: {
                avgAge: {
                    $avg: '$age'
                }
            }
        },
        {
            $project: {
                "firstName": 1,
                "age": 1,
                "avgAge": 1
            }
        },
        {
            $limit: 5
        }
    ]);
    console.log(result);
}

export async function lookup() {
    const result = await User.aggregate([
        {
            $lookup: {
                from: 'orders',
                localField: '_id',
                foreignField: 'user',
                as: 'oder_details'
            }
        }
    ]);
    console.log(result);
};