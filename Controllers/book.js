const bookSchema = require("../Schemas/book")


exports.getAllBooks = async function(req, res){
    try{
        const books = await bookSchema.find()
        res.json({ data: books, message: "books Shown successfully!" });
    }catch (err){
        res.status(400).send({message: "There was an error RETRIEVING the BOOKS => " + err})
    }
} 

exports.getBook = async function(req, res){
    try{
        const book = await bookSchema.find({_id: req.params.id})
        
        if(book.length === 0 ){
            res.json({  data: book, message: "Book Not Found ! "});    
        }else{
            res.json({  data: book, message: "Book Shown successfully!"});
        }
    }catch (err){
        res.status(400).send({message: "There was an error RETRIEVING Identified Book => " + err })    
    }
}

exports.deleteBook = async function(req, res){
    try{
        const Role = req.user.role
        if ( Role === "Admin"){
            await bookSchema.findByIdAndDelete(req.params.id)
            res.json({  data: [], message: "Book Deleted successfully!"});
        }else{
            res.status(403).send({message: " You are not authorized to DELETE Books! "})
        }
        // const book = await bookSchema.find(req.body.name)
        
    }catch (err){
        res.status(400).send({message:"There was an error DELETING the book => " + err })
    }
}

exports.updateBook = async function(req, res){
    try{
        const Role = req.user.role 
        if (Role === "Admin"){
            await bookSchema.findByIdAndUpdate(req.params.id, req.body)
            res.json({ message: req.body.name + " Updated successfully!" , data: req.body});
        }else{
            res.status(403).send({message: "You are not Authorized to UPDATE Books! "})
        }
       
       
    }catch (err){
        res.status(400).send({message: "There was an error UPDATING the Book => " + err})
    }
}

exports.addBook = async function(req, res){
    try{
        const Role = req.user.role
        if (Role === "Admin" ){
            const createdBook = await bookSchema.create(req.body)
            res.json({ message: createdBook.name + " Added successfully!", data: createdBook});
        }else{
            res.status(403).send({message: "You are not Authorized to ADD Books! "})
        }
     
    }catch (err){
        res.status(400).send({message: "There was an error ADD a new Book => " + err})
    } 
}