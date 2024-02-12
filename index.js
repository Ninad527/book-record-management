const express = require("express");
// const {users} = require("./data/users.json"); Not requie over here as we have mentioned it in users.js and books.js files

const dotenv = require("dotenv");
const usersRouter = require("./routes/users")
const booksRouter = require("./routes/books")

dotenv.config();

const PORT = 8081;

const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.status(200).json ({
        message : "Server is Up and running"
    });  
});

app.use("/users", usersRouter); //users
app.use("/books", booksRouter); //books

app.get("*", (req, res)=>{
    res.status(404).json({
        message : "This Route does not exist"
    });
});

app.listen(PORT, () =>{
    console.log(`Server is running at Port ${PORT}`)
});