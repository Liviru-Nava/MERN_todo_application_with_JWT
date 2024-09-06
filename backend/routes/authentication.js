//we need to import the model, express, jwt and bcrypt
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserSchema = require('../schemas/UserSchema');

//define router
const router = express.Router();

//registration route
router.post("/register", async(request, response)=>{
    const {username, email, password} = request.body;

    try{
        //check if the user already exists
        let user_exist = await UserSchema.findOne({email});
        if(user_exist){
            return response.status(400).json({error: "User already exists"});
        }

        //create a new user
        new_user = new UserSchema({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        })

        await new_user.save();

        //create and return JWT
        //first create the payload (a json object that contains the user id and is a component of the entire JWT structure)
        const payload = {
            user:{
                id: new_user.id
            }
        };

        //create the JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        //return the token
        response.json({token});

    }catch(error){
        response.status(500).json({error: "Server error"});
    }
});

//login route
router.post("/login", async(request, response)=>{
    const {email, password} = req.body;

    try{
        //check if the email is correct
        const user = await UserSchema.findOne({email});
        if(!user){
            response.status(400).json({message: "Invalid credentials"});
        }
        //check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            response.status(400).json({message: "Invalid credentials"});
        }
        //create a payload to put the user id in the token
        const payload = {
            user:{
                id: user.id
            }
        }
        const token=jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        response.json({token});

    }catch(error){
        response.status(500).json({error: "Server error"});
    }
})
module.exports = router;