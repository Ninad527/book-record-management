const express = require("express");

const PORT = 8081;

const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.status(200).json ({
        message : "Server is Up and running"
    });  
});

app.get("*", (req, res)=>{
    res.status(404).json({
        message : "This Route does not exist"
    });
});

app.listen(PORT, () =>{
    console.log(`Server is running at Port ${PORT}`)
});