const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = "mongodb://localhost:2727/";
/* GET home page. */
router.post('/calificaciones', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("practica5");
    const myobj = req.body;
    dbo.collection("lista_de_calificaciones").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  res.send({
    status: 'ok'
  })
});
router.post('/calificaciones-actualizar', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("practica5");
    const _id = req.body._id;
    const myobj = req.body;
    console.log(myobj)
    delete myobj._id;
    console.log(myobj)
    dbo.collection("lista_de_calificaciones").updateOne(
        {_id: new ObjectId(_id)},
                      {$set: myobj},
        function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  res.send({
    status: 'ok'
  })
});
router.post('/calificaciones-eliminar', function(req, res, next) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("practica5");
    var myquery = { _id: new ObjectId(req.body._id) };
    dbo.collection("customers").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
  res.send({
    status: 'ok'
  })
});

router.get('/calificaciones', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("practica5");
    dbo.collection("lista_de_calificaciones").find({}).toArray(function(err, result) {
      if (err) res.send(err);
      else res.send(result);
      db.close();
    });
  });
})




module.exports = router;
