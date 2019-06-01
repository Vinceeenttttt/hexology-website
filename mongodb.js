const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');

//var url = "mongodb://localhost:27017/mydb";

const uri = "mongodb+srv://vincent:vincent@hexology-nkjiq.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//     if (err) throw err;
//     var dbo = client.db("mydb");
//     var myobj = { name: "Robert", level: "Beginner", time: moment().format()};
//     dbo.collection("test").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       client.close();
//     });
// });

function insertdoc(CollectionName, Obj){
  client.connect(err => {
      if (err) throw err;
      var dbo = client.db("hexology");
      dbo.collection(CollectionName).insertOne(Obj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        client.close();
      });
  });
}

function filterdoc(CollectionName, queryname){
  client.connect(err => {
    if (err) throw err;
    var dbo = client.db("hexology");
    dbo.collection(CollectionName).find(queryname).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      client.close();
    });
});
}

var CollectionName = "profiles";
var myobj = {
  name: "Robert",
  level: "Beginner",
  Interests: "EEE",
  time: moment().format()
};

//insertdoc(CollectionName, myobj);

var query = { level: "Beginner"};
filterdoc(CollectionName, query);

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var myobj = { name: "Bob", level: "Beginner" };

    // Create a collection

    // dbo.createCollection("customers", function(err, res) {
    //     if (err) throw err;
    //     console.log("Collection created!");
    //     db.close();
    //   });

    // Insert one document

    // dbo.collection("customers").insertOne(myobj, function(err, res) {
    //   if (err) throw err;
    //   console.log("1 document inserted");
    //   db.close();
    // });
    
    // Find the first document

    // dbo.collection("customers").findOne({}, function(err, result) {
    //     if (err) throw err;
    //     console.log(result.name);
    //     db.close();
    //   });

    // Filter the result

    //   var query = { level: "Beginner" };
    //   dbo.collection("customers").find(query).toArray(function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    //   });
    
    // Delete the document

//   var myquery = { level: 'Beginner' };
//   dbo.collection("customers").deleteOne(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     db.close();
//  });

    // Delete the collection

    // dbo.collection("customers").drop(function(err, delOK) {
    //     if (err) throw err;
    //     if (delOK) console.log("Collection deleted");
    //     db.close();
    // });

    // Update the document

    // var myquery = { level: "Beginner" };
    // var newvalues = { $set: {name: "Viv", level: "expert" } };
    // dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    //   if (err) throw err;
    //   console.log("1 document updated");
    //   db.close();
    // });

// });
