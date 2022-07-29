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


//get - Shows the full list of books
router.get('/', asyncHandler(async(req, res) => {
    const books = await Book.findAll();
    res.render("index", { books });

   }));

 //get- Shows the create new book form
router.get('/new', asyncHandler(async(req, res) => {
  res.render("new-book", { book: {}, title: "Books" });
 }));


 //post - Posts a new book to the database
 router.post('/new', asyncHandler(async(req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/");
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("new-book", { book, error: error.errors, title: "New Book" })
    } else {
      throw error;
    }  
}}));

//  /* new created below*/ 
// //Get book to edit
router.get("/:id", asyncHandler(async(req, res) => {
  const book = await Book.findByPk(req.params.id);
    res.render("update-book", { book });      
  }
));


//post- Updates book info in the database
router.post("/:id", asyncHandler(async(req, res) => {
  let book;
  try {
   book = await Book.findByPk(req.params.id); //async call
   if(book){
    await book.update(req.body);
    res.redirect("/");
  } else {
    res.sendStatus(404);
  }
} catch (error){
  if(error.name === "SequelizeValidationError") {
    book = await Book.build(req.body);
    book.id = req.body.id; // make sure correct book gets updated
    res.render("update-book", { book, errors: error.errors, title: "Edit Book" })
  } else {
    throw error;
  }
}}));


//post  Deletes a book
router.post("/:id/delete", asyncHandler(async (req, res) => {
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


