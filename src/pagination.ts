import User from "./models/user";

export async function pagination(page: number = 1, limit: number = 2) {
    const offest: number = (page - 1) * limit;
    const users = await User.find().skip(offest).limit(limit);
    console.log(users);
}

export async function aggregatePagination(page: number = 1, limit: number = 2) {
    const offset: number = (page - 1) * limit;
    const users = await User.aggregate([
        {
            '$facet': {
                pagination: [
                    {
                        $count: 'noOfRecords'
                    },
                    {
                        $addFields: {
                            limit: limit,
                            offset: offset
                        }
                    }
                ],
                data: [
                    {
                        $skip: offset
                    },
                    {
                        $limit: limit
                    },
                    {
                        $project: {
                            id: '$_id',
                            _id: 0,
                            firstName: 1,
                            lastName: 1,
                            age: 1,
                            createdAt: 1
                        }
                    }
                ]
            }
        },
    ]);
    console.log(JSON.stringify(users[0]));
}