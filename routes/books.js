var express = require('express');
const books = require('../models').books;
var router = express.Router();


//Handler function to wrap (?) each route
function asyncHandler(cb){
  return async(req, res, next) =>{
    try{
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

/* GET home page. */
router.get('/', async(req, res, next) => {
  //res.render('index', { title: 'Express' });
    const books = await Book.findAll();
    res.render("index", { books });
    console.log( books.map(book => book.toJSON()) );
   });

/* GET users listing. */
router.get('/', asyncHandler(async(req, res) => {
  res.render("Books/index",{ books:{}, title: "Books List" });
}));


//get /books - Shows the full list of books
router.get('/books', asyncHandler(async(req, res) => {
    const books = await Book.findAll();
    res.render("index", { books });

   }));

//get /books/new - Shows the create new book form
router.get('/books/new/:id', asyncHandler(async(req, res) => {
    res.render("books/new", { book: {}, title: "New Book" });
   }));

//post /books/:id - Updates book info in the database
router.post('/books/:id', asyncHandler(async(req, res) => {
  const book = await Book.findbyPk(req.params.id); //async call
  await books.update(req.body)
  res.redirect("/books/" + books.id);
 // res.render("articles/edit", { book, title: "Edit Book" })
 }));

//get /books/:id - Shows book detail form
router.post('/', asyncHandler(async(req, res) => {
  const books = await Book.create(req.body);
  res.redirect("/books/" + books.id);
 }));


 //post /books/new - Posts a new book to the database
router.get('/books/:id', asyncHandler(async(req, res) => {
  res.render("/books/show", { books: {}, title: "Book Title" });
 }));


//post /books/:id/delete - Deletes a book. Careful, this can’t be undone. It can be helpful to create a new “test” book to test deleting
router.get("/books/:id/delete", asyncHandler(async (req, res) => {
  res.render("books/delete", { books: {}, title: "Delete Book" });
}));

//delete specific book (don't know if I need this)
router.post('/books/:id/delete', asyncHandler(async(req, res) => {
  res.redirect("/books");
 }));

module.exports = router;
