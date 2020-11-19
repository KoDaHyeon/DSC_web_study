const fs = require('fs');
var dbFile = 'db.json';
var dbDataBuffer = fs.readFileSync(dbFile);
var dbJSON = dbDataBuffer.toString();

function dbSync() {
	fs.writeFileSync(dbFile, dbJSON);
}

const express = require('express');
const { resolveTxt } = require('dns');
const app = express();
const PORT = 5000;

app.use(express.json());


app.get('/', (req, res) => {
	console.log('GET\t/');
  res.send("Hello world");
  
});

/*
**	GET /todos/
*/

app.get('/todos/', (req, res) => {
  console.log('GET\t/todos/');
  var dbDataBuffer = fs.readFileSync(dbFile);
  var dbJSON = dbDataBuffer.toString();
  var data = JSON.parse(dbJSON);
	res.json(data);
});

/*
** POST /todos/
*/

app.post('/todos/', (req, res) => {
  console.log('POST\t/todos/');
  var dbDataBuffer = fs.readFileSync(dbFile);
  var dbJSON = dbDataBuffer.toString();
  var data = JSON.parse(dbJSON);
  if(Object.keys(req.body) != "content"){
    res.send("Request body error!");
  }
  else{
    var dataLen = data["todos"].length;
    console.log(dataLen);
    var newData = {
      "id" : dataLen + 1,
      "content" : req.body["content"],
      "completed" : false
    }
    data["todos"][dataLen] = newData;

    fs.writeFileSync(dbFile, JSON.stringify(data));
    var response = {
      "success" : true,
      "todo" : data["todos"][dataLen]
    }
    res.send(response);
  }

});

/*
**	PATCH /todos/:todo_id
*/

app.patch('/todos/:todo_id', (req, res) => {
  console.log('PATCH\t/todos/');
  
  var dbDataBuffer = fs.readFileSync(dbFile);
  var dbJSON = dbDataBuffer.toString();
  var data = JSON.parse(dbJSON);
  var patchTarget = req.params.todo_id-1;
  var keyArray = Object.keys(req.body);

  for(key of keyArray){
    data["todos"][patchTarget][key] = req.body[key];
  }
  
  fs.writeFileSync(dbFile, JSON.stringify(data));
  var response = {
    "success" : true,
    "todo" : data["todos"][patchTarget]
  }
  res.send(response);

});

/*
**	DELETE /todos/:todo_id
*/

app.delete('/todos/:todo_id', (req, res) => {
	console.log('DELETE\t/todos/');
  
  var dbDataBuffer = fs.readFileSync(dbFile);
  var dbJSON = dbDataBuffer.toString();
  var data = JSON.parse(dbJSON);
  var deleteTarget = req.params.todo_id-1;
  data["todos"].splice(deleteTarget, 1);
  
  for(var i=deleteTarget; i<data["todos"].length; i++){
    data["todos"][i]["id"]--;
  }

  fs.writeFileSync(dbFile, JSON.stringify(data));
  var response = {
    "success" : true
  }
  res.send(response);

});

app.listen(PORT, () => {
	console.log('Something behind... you have to implement this...!');
	console.log(`Server is running and listening on port ${PORT}!`);
});
