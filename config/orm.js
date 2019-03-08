// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}
//...........................................................

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value
  for (var key in ob) {
    var value = ob[key];
  // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
  // if string with spaces, add quotations
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }      
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}
//...............................................................

// Object for all our SQL statement functions.
var orm = {
  all: function(Burgers, cb) {
    var queryString = "SELECT * FROM " + Burgers + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  
  create: function(Burgers, cols, vals, cb) {
    var queryString = "INSERT INTO " + Burgers;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

 
  update: function(Burgers, objColVals, condition, cb) {
    var queryString = "UPDATE " + Burgers;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },


  delete: function(Burgers, condition, cb) {
    var queryString = "DELETE FROM " + Burgers;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model
module.exports = orm;


