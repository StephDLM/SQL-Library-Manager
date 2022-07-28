var express = require('express');
const Book = require("../models").Book;
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
router.get('/books', asyncHandler(async(req, res, next) => {
  //res.render('index', { title: 'Express' });
    const books = await Book.findAll();
    res.render("index", { books });
    console.log( Book.map(Book => Book.toJSON()) );
}));


// /* GET book listing. */
// router.get('/', asyncHandler(async(req, res) => {
//   res.render("index",{ books:{}, title: "Books List" });
// }));


//get - Shows the full list of books
router.get('/books', asyncHandler(async(req, res) => {
    const book = await book.findAll();
    res.render("index", { books });

   }));

 //get- Shows the create new book form
router.get('/books/new/:id', asyncHandler(async(req, res) => {
  res.render("books/new", { book: {}, title: "New Book" });
 }));

 //post - Posts a new book to the database
 router.post('/books/:id', asyncHandler(async(req, res) => {
  //res.render("/books/show", { books: {}, title: "Book Title" });
  let book;
  try {
    book = await book.create(req.body);
    res.redirect("/books/" + book.id);
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      article = await book.build(req.body);
      res.render("books/new", { books, errors: error.errors, title: "New Book" })
    } else {
      throw error;
    }  
}}));

 

//get - Shows book detail form
router.post('/books/:id', asyncHandler(async(req, res) => {
  const book = await book.findByPk(req.params.id);
 // res.redirect("/books/" + books.id);
 if(article) {
  res.render("articles/show", { article, title: article.title });  
} else {
  res.sendStatus(404);
}
 }));
 

//post- Updates book info in the database
router.post('/books/:id', asyncHandler(async(req, res) => {
  let book;
  try {
   book = await book.findbyPk(req.params.id); //async call
   if(book){
    await book.update(req.body)
    res.redirect("/books/" + books.id);
  // res.render("articles/edit", { book, title: "Edit Book" })
  } else {
    res.sendStatus(404);
  }
} catch (error){
  if(error.name === "SequelizeValidationError") {
    book = await book.build(req.body);
    book.id = req.params.id; // make sure correct book gets updated
    res.render("book/edit", { article, errors: error.errors, title: "Edit Book" })
  } else {
    throw error;
  }
}}));


//post  Deletes a book
router.get("/books/:id/delete", asyncHandler(async (req, res) => {
 // res.render("books/delete", { books: {}, title: "Delete Book" });
 const book = await Article.findByPk(req.params.id);
 if(book) {
   await book.destroy();
   res.redirect("/books");
 } else {
   res.sendStatus(404);
 }
}));


module.exports = router;


