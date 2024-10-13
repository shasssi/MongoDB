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
  - User.updateOne({ age: { $gt: 29 } }, { $set: { ...data } }) `updates first doucument that matches the filter`
  - User.updateMany({ lastName: 'kumar' }, { $set: { ...data } }) `updates all doucuments that matches the filter`
