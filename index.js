const express = require("express");
const {users} = require("./data/users.json");

const PORT = 8081;

const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.status(200).json ({
        message : "Server is Up and running"
    });  
});

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */
app.get("/users", (req, res)=>{
    res.status(200).json({
        success: true,
        data: users,
    })
})

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get users by ID
 * Access: Public
 * Parameters: id
 */
 app.get("/users/:id", (req, res)=> {
    const{id} = req.params;
    const user = users.find((each) => each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "user not found"
        });
    }
    res.status(200).json({
        success: true,
        data: user
    });
 });

 /**
 * Route: /users
 * Method: Post
 * Description: Create new user
 * Access: Public
 * Parameters: none
 */
app.post("/users", (req, res) =>{
    const{id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
    const user = users.find((each) => each.id === id);

    if(user){
        return res.status(404).json({
        success: false,
        message: "User exist with this ID"
        });
    }

    users.push({
        id,
        name,
        surname,
        email, 
        subscriptionType,
        subscriptionDate
    });
    res.status(200).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 * Method: Put
 * Description: Update a user
 * Access: Public
 * Parameters: id
 */
app.put("/users/:id", (req, res) => {
    const{id} = req.params;
    const{data} = req.body;
    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found with this ID"
        });
    }
    const updateduser = users.map((each) =>{
        if(each.id === id){
            return{
                ...each,
                ...data
            };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: updateduser
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