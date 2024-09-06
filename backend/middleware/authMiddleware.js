const jwt = require("jsonwebtoken");

module.exports = (request, response, next) =>{
    const token = req.header("x-auth-token");
    if(!token){
        return response.status(401).json({message: "No token, authorization denied"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded.user;
        next();
    }catch(error){
        response.status(401).json({message: "Token is not valid"});
    }
};