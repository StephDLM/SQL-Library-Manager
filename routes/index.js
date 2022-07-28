var express = require('express');
var router = express.Router();
// const Book = require("../models").Book;

//redirect into books file
router.get('/', (req, res, next) => {
    res.redirect('/books')
   });
  
//res.json--
module.exports = router;
