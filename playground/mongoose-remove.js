const {
  ObjectID
} = require('mongodb');

const {
  mongoose
} = require('./../server/db/mongoose');
const {
  Todo
} = require('./../server/models/todo');
const {
  User
} = require('./../server/models/user');

Todo.findByIdAndRemove('58bc729764dbb43140f54166').then((result) => {
  console.log(result);
});