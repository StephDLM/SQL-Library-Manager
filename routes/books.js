var express = require('express');
const Book = require("../models").Book; //book the data model
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
router.get('/', asyncHandler(async(req, res) => {
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
router.get('/', asyncHandler(async(req, res) => {
    const book = await Book.findAll();
    res.render("index", { book });

   }));

 //get- Shows the create new book form
router.get('/new/:id', asyncHandler(async(req, res) => {
  res.render("/new", { book: {}, title: "New Book" });
 }));

 //post - Posts a new book to the database
 router.post('/:id', asyncHandler(async(req, res) => {
  //res.render("/books/show", { books: {}, title: "Book Title" });
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/");
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      article = await Book.build(req.body);
      res.render("/new", { book, errors: error.errors, title: "New Book" })
    } else {
      throw error;
    }  
}}));

 
// //get - Shows book detail form
// router.post('/:id', asyncHandler(async(req, res) => {
//   const book = await Book.findByPk(req.params.id);
//  // res.redirect("/books/" + books.id);
//  if(book) {
//   res.render("/show", { book, title: book.title });  
// } else {
//   res.sendStatus(404);
// }
//  }));
 

//post- Updates book info in the database
router.post('/:id', asyncHandler(async(req, res) => {
  let book;
  try {
   book = await Book.findbyPk(req.params.id); //async call
   if(book){
    await book.update(req.body)
    res.redirect("/" + book.id);
  // res.render("articles/edit", { book, title: "Edit Book" })
  } else {
    res.sendStatus(404);
  }
} catch (error){
  if(error.name === "SequelizeValidationError") {
    book = await Book.build(req.body);
    book.id = req.body.id; // make sure correct book gets updated
    res.render("/edit", { book, errors: error.errors, title: "Edit Book" })
  } else {
    throw error;
  }
}}));


//post  Deletes a book
router.get("/:id/delete", asyncHandler(async (req, res) => {
 // res.render("books/delete", { books: {}, title: "Delete Book" });
 const book = await Book.findByPk(req.params.id);
 if(book) {
   await book.destroy();
   res.redirect("/");
 } else {
   res.sendStatus(404);
 }
}));


module.exports = router;


