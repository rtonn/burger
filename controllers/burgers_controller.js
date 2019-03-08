var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js"); 


//..........................................................

// Index Redirect
router.get('/', function (req, res) {
   res.redirect('/index');
 });

//GET route to get burgers from database.
router.get('/index', function(req, res){
   burger.all(function(data){
      var hbsObject = {burgers: data}; 
         console.log(hbsObject); 
      res.render('index', hbsObject); 
   }); 
}); 


// Create a New Burger
router.post('/api/burgers', function (req, res) {
  burger.create([
     "burger_name", "devoured"
   ], [
      req.body.burger_name, req.body.devoured 
   ],  function(result) {
      res.json({ id: result.insertId}); 
      // res.redirect('/index');
  });
});


//Devour a burger
router.put("/api/burgers/:id", function(req, res) {
   var condition = "id = " + req.params.id;
 
   console.log("condition", condition);
 
   burger.update({
     devoured: req.body.devoured
   }, condition, function(result) {
     if (result.changedRows == 0) {
       // If no rows were changed, then the ID must not exist, so 404
       return res.status(404).end();
     } else {
       res.status(200).end();
     }
   });
 });


// Export routes for server.js to use.......................
module.exports = router;