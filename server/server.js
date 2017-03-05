const {
  ObjectID
} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {
  mongoose
} = require('./db/mongoose');

var {
  User
} = require('./models/user');

var {
  Todo
} = require('./models/todo');

var app = express();

//middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    console.log('Error creating document');
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {

  Todo.find().then((todos) => {
    res.send({
      todos
    })
  }, (err) => {
    res.status(400).send(err);
  });

});

app.get('/todos/:id', (req, res) => {

  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  Todo.findById(id).then((todo) => {

    if (!todo) {
      return res.send(404).send();
    }

    res.send({
      todo
    });

  }).catch((err) => {
    res.status(400).send(err);
  });

});

app.listen(3000, () => {
  console.log('server running on localhost:3000');
});

module.exports = {
  app
};