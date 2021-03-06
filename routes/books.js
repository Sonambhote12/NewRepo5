var express = require('express');
var router = express.Router();
var books  = require('../resources/books');
let Books = require('../models/books');

router.get('/add', function (req, res, next) {
    res.render('addBooks', {
        title: 'Add book',
    });
});

router.post('/save', function (req, res) {
    //books.push({...req.body, _id: `00${books.length + 1}`});
    const book = new Books(req.body);
    let promise = book.save();
    promise.then(() => {
        console.log('Book added');
        res.redirect('/');
    })

});

router.get('/remove/:id', function (req, res) {
    Books.remove({ _id: req.params.id}, function(){
        res.redirect('/');
    })
    //books.splice(req.params.index, 1);
    //res.redirect('/');
});

//To edit and show in field
router.get('/edit/:id', function (req, res) {
   // const book = books.find((book) => book._id === req.params._id);
    //res.render('editBooks', {
       // title: 'Edit book',
        //book
    //});
    Books.findOne({ _id: req.params.id}, function(err, book) {
        res.render('editBooks', {title: 'Edit book', book: book});
    })
});



//findOneAndUpdate
router.post('/edit/:_id', function (req, res) {
    let currIndex = books.findIndex(book => book.id == req.params._id);
    res.redirect('/')
});

//Not using dbs
/*
    router.post('/saveEdited/:id', function (req, res){
        const index = books.findIndex(book) => { return book._id === req.params.id});
        books.splice(index, 1 { ...req.body, _id: index});
        res.redirect('/');
    })
*/
router.post('/saveEdited/:id', function (req, res){
    //const index = books.findIndex(book) => { return book._id === req.params.id});
    //books.splice(index, 1 { ...req.body, _id: index});
    //res.redirect('/');

    Books.findOneAndUpdate({_id: req.params.id}, {$set: req.body }, function(err, book){
        console.log(book)
        res.redirect('/');
    })
});
module.exports = router;