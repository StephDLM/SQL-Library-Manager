var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET home page. */
router.get('/', async(req, res, next) => {
  //res.render('index', { title: 'Express' });
    const books = await Book.findAll();
    res.render("index", { books, title: "Book" });
    console.log( books.map(book => book.toJSON()) );
   });

//get /books - Shows the full list of books
router.get('/books', async(req, res, next) => {
    const books = await Book.findAll();
    res.render("index", { books, title: "Book" });
    console.log( books.map(book => book.toJSON()) );
   });
//get /books/new - Shows the create new book form
router.get('/books/new', async(req, res, next) => {
    const books = await Book.findAll();
    res.render("index", { books, title: "Book" });
    console.log( books.map(book => book.toJSON()) );
   });

//post /books/new - Posts a new book to the database
router.post('/books/new', async(req, res, next) => {
  const books = await Book.findAll();
  res.render("index", { books, title: "Book" });
  console.log( books.map(book => book.toJSON()) );
 });

//get /books/:id - Shows book detail form
router.get('/books/:id', async(req, res, next) => {
  const books = await Book.findAll();
  res.render("index", { books, title: "Book" });
  console.log( books.map(book => book.toJSON()) );
 });

//post /books/:id - Updates book info in the database
router.post('/books/:id', async(req, res, next) => {
  const books = await Book.findAll();
  res.render("index", { books, title: "Book" });
  console.log( books.map(book => book.toJSON()) );
 });

//post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting
router.post('/books/:id/delete', async(req, res, next) => {
  const books = await Book.findAll();
  res.render("index", { books, title: "Book" });
  console.log( books.map(book => book.toJSON()) );
 });

module.exports = router;