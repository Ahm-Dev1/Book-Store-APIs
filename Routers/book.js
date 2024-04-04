const express = require("express")
const bookController = require('../Controllers/book')
const router = express.Router()
const authintication = require("../MiddleWares/auth")


router.get('/api/books', authintication, bookController.getAllBooks)
router.get('/api/books/:id', authintication, bookController.getBook)
router.delete('/api/books/:id', authintication, bookController.deleteBook)
router.put('/api/books/:id', authintication, bookController.updateBook)
router.post('/api/books', authintication, bookController.addBook)



module.exports = router