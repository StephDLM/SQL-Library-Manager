var express = require('express');
var router = express.Router();
const Book = require(".../models").Book;

/* GET home page. */
router.get('/', async(req, res, next) => {
  //res.render('index', { title: 'Express' });
    const books = await Book.findAll();
    res.render("index", { books, title: "New Book" });
    console.log( books.map(book => book.toJSON()) );
   });
  

module.exports = router;
