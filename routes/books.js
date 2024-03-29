const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json")

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: None
 */

router.get("/", (req, res) =>{
    return res.status(200).json({
        success: true,
        data: books
    });
});


/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by ID
 * Access: Public
 * Parameters: id
 */
router.get("/:id", (req, res) =>{
    const {id} = req.params;
    const book = books.find((each) => each.id === id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: book,
    });
});

/**
 * Route: /books
 * Method: POST
 * Description: Create a new book
 * Access: Public
 * Parameters: none
 */
router.post("/", (req, res)=> {
    const{id, name, author, genre, price, publisher} = req.body;
    const book = books.find((each) => each.id === id);

    if(!id && !name && !author && !genre && !price && !publisher){
        return res.status(404).json({
            success: false,
            message: "No data Provided"
        });
    }
    
    if(book){
        return res.status(404).json({
            success: false,
            message: "Book Exist with this ID"
        });
    }

    books.push({
        id,
        name,
        author,
        genre,
        price,
        publisher
    });
    return res.status(200).json({
        success: true,
        data: books
    });
});

/**
 * Route: /books/:id
 * Method: PUT
 * Description: update a book by ID
 * Access: Public
 * Parameters: id
 */
router.put("/:id", (req, res) => {
    const{id} = req.params;
    const{data} = req.body;
    const book = books.find((each) => each.id === id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not found with this ID"
        });
    };

    const updatedBook = books.map((each) =>{
        if(each.id === id){
            return {
                ...each,
                ...data
            };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: updatedBook
    });
});

/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Delete a book by ID
 * Access: Public
 * Parameters: id
 */
router.delete("/:id", (req, res) =>{
    const{id} = req.params;
    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not Exist with this ID"
        });
    };
    const index = books.indexOf(book);
    books.splice(index, 1);

    return res.status(200).json({
        success: true,
        data: books
    });  
});

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */
router.get("/issued/by-user", (req, res)=> {
    const usersWithIssuedBook = users.filter((each) =>{
        if(each.issuedBook) return each;
    });
    const issuedBooks = [];
    usersWithIssuedBook.forEach((each)=> {
        const book = books.find((book)=> book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate
        issuedBooks.push(book);
    });
    if(issuedBooks.length === 0)
     return res.status(404).json({
        success: false,
        message: "No books issued yet"     
    });
    return res.status(200).json({
        success: true,
        data: issuedBooks
    });
});

/**
 * Route: /users/:id
 * Method: GET 
 * Description: Get all issued books with fine 
 * Access: Public
 * Parameters: id
 */

// router.get("/isuuedbooks-withfine/:id", (req, res) =>{
//     const usersWithIssuedBook = users.filter((each) =>{
//         if(each.issuedBook) return each;
//     });
//     const issuedBooks = [];
//     usersWithIssuedBook.forEach((each)=> {
//         const book = books.find((book)=> book.id === each.issuedBook);


        
//         fine : returnDate < currentDate ? (subscriptionExpired ? 200 : 100) : 0,
//         issuedBooks.push(book);
//     });
//     if(issuedBooks.length === 0)
//      return res.status(404).json({
//         success: false,
//         message: "No books issued yet"     
//     });
//     return res.status(200).json({
//         success: true,
//         data: issuedBooks
//     });
// });

//Default Export
module.exports = router;
//Initially if it doesn't have any routes attach to it 
//it still exports it