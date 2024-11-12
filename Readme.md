##### [MongoDB CRUD](https://github.com/shasssi/MongoDB/tree/master/src/controllers)

- Read
  - User.find() `fetch all records from collection`
  - User.findById('67081c5b1f4465ce739c9bf4') `fetch record which matches Id`
  - User.findOne({lastName: 'Kumar'}) `fetch first document that matches the filter`
  - User.find({lastName: 'Kumar'}) `fetch all records that matches the filter`
  - db.posts.find({}, {title: 1, date: 1}) `This example will only display the title and date fields in the results.`
  - db.posts.find({}, {_id: 0, title: 1, date: 1}) `This time, let's exclude the _id field.`

- Create
  - User.create({name: '', age: 11}) `create single record`
  - User.create([{name: '', age: 11}, {name: '', age: 12}]) `create bulk record`

- Delete
  - User.findByIdAndDelete(id) `delete a particular record`
  - User.deleteOne({ age: { $gt: 29 } }) `delete only one after filter`
  - User.deleteMany({ age: { $gt: 31 } }) `delete multiple records after filter`
  - User.deleteMany({}) `delete all records from a collection`
  - User.collection.drop() `drop collection from DB`

- Update
  - User.findByIdAndUpdate(id, { ...data }) `update the documenet that matches id`
  - User.updateOne({ age: { $gt: 29 } }, { $set: { ...data } }) `updates first doucument that matches the filter`
  - User.updateMany({ lastName: 'kumar' }, { $set: { ...data } }) `updates all doucuments that matches the filter`


##### [MongoDB Aggregations](https://github.com/shasssi/MongoDB/blob/master/src/aggregate.ts)

- $group
  `User.aggregate([
    {
      $group:
        {
          _id: "$gender", // column_name
        },
    },
  ])`
- $sort
  `User.aggregate([
      {
          $sort: {
              'age': -1 // 1: ascending, -1: descending
          }
      }
  ]);`
- $limit
  `User.aggregate([
      {
          $limit: 5
      }
  ]);`
- $lookup
  `User.aggregate([
      {
          $lookup: {
              from: 'orders',
              localField: '_id', // from users collection
              foreignField: 'user', // from orders collection
              as: 'oder_details'
          }
      }
  ]);`
- $project 
  `User.aggregate([
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
  ]);`
- $match
  `User.aggregate([
      {
          $match: { gender: 'Male' }
      },
      {
          $count: 'totalMale'
      }
  ]);`

##### [MongoDB Pagination](https://github.com/shasssi/MongoDB/blob/master/src/pagination.ts)
  `const limit = 5;
   const page = 1;
   // Calculate the offset based on the page number and limit
   const offset = (page - 1) * limit;
  `
  - User.find().skip(offset).limit(limit);
  - using aggregation
  `User.aggregate([
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
  ])`
