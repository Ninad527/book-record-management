const express = require("express");
const {users} = require("../data/users.json");
const {books} = require("../data/books.json");

const router = express.Router();


/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res)=>{
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
 router.get("/:id", (req, res)=> {
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
router.post("/", (req, res) =>{
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
router.put("/:id", (req, res) => {
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

/**
 * Route: /users/:id
 * Method: Put
 * Description: Update a user
 * Access: Public
 * Parameters: id
 */
router.delete("/:id", (req, res) =>{
    const{id} = req.params;
    const user = users.find((each) => each.id === id)

    if(!user){
        res.status(404).json({
            success: false,
            message: "User Not found with this ID"
        });
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(202).json({
        success: true,
        data: users,
    });
});

module.exports = router;