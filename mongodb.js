const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: "Vincent", level: "Beginner" };

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

      var query = { level: "expert" };
      dbo.collection("customers").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    
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

});